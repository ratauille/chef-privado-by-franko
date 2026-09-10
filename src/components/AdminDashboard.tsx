import React, { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ShieldCheck, LogOut, Search, Trash2, CheckCircle2, MessageSquare, ArrowRight, Lock } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('frankocheff99@gmail.com');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const [reservations, setReservations] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const token = await currentUser.getIdTokenResult(true);
          if (token.claims && token.claims.admin === true) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
            setLoginError('Tu cuenta no tiene privilegios de Administrador (Custom Claim admin: true).');
          }
        } catch (e: any) {
          setLoginError(e.message);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAdmin) return;

    const colRef = collection(db, 'reservations');
    const unsubscribe = onSnapshot(
      colRef,
      snapshot => {
        const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        docs.sort((a: any, b: any) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        setReservations(docs);
      },
      err => {
        console.error('Firestore listener error:', err);
      }
    );

    return () => unsubscribe();
  }, [isAdmin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err: any) {
      setLoginError(err.message || 'Credenciales incorrectas.');
    }
  };

  const handleLogout = () => signOut(auth);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'reservations', id), { status: newStatus });
    } catch (err: any) {
      alert('Error al actualizar estado: ' + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta reserva?')) return;
    try {
      await deleteDoc(doc(db, 'reservations', id));
    } catch (err: any) {
      alert('Error al eliminar reserva: ' + err.message);
    }
  };

  const filteredReservations = reservations.filter(r => {
    const matchesFilter = filter === 'all' || (r.status || 'pending') === filter;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      (r.clientName && r.clientName.toLowerCase().includes(q)) ||
      (r.email && r.email.toLowerCase().includes(q)) ||
      (r.phone && r.phone.toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  });

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="bg-white border border-stone-200 rounded-2xl shadow-xl p-8 max-w-md w-full space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-gold-100 border border-gold-300 text-[#8c6a24] mx-auto flex items-center justify-center">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-stone-900">Acceso Administrador</h2>
            <p className="text-xs text-stone-500">Ingresa tus credenciales para gestionar las reservas</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-stone-600 mb-1">Correo Electrónico</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#8c6a24] text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-stone-600 mb-1">Contraseña</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#8c6a24] text-sm outline-none"
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-black hover:bg-stone-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Iniciar Sesión en el Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col">
      {/* Admin Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-[#8c6a24] font-serif font-bold text-lg border border-gold-300">
              C4Y
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold tracking-wide text-stone-900">
                Chef4You <span className="text-[#8c6a24] text-xs font-sans uppercase tracking-widest ml-1">Admin Panel</span>
              </h1>
              <p className="text-[11px] text-stone-500 uppercase tracking-widest">Gestión de Reservas & Catering de Lujo</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-stone-800">{user.email}</p>
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Admin verificado
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="px-3.5 py-2 text-xs font-semibold text-stone-700 hover:text-red-700 bg-stone-100 hover:bg-red-50 border border-stone-200 rounded-lg transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Table & Controls */}
        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Buscar cliente, email o teléfono..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-300 text-xs outline-none focus:ring-2 focus:ring-[#8c6a24]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
              {['all', 'pending', 'confirmed', 'completed'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    filter === f ? 'bg-black text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {f === 'all' ? 'Todas' : f === 'pending' ? 'Pendientes' : f === 'confirmed' ? 'Confirmadas' : 'Completadas'}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 uppercase text-[11px] font-bold text-stone-600 tracking-wider">
                <tr>
                  <th className="px-6 py-3">Cliente / IA Gemini</th>
                  <th className="px-6 py-3">Contacto</th>
                  <th className="px-6 py-3">Fecha & Comensales</th>
                  <th className="px-6 py-3">Servicio</th>
                  <th className="px-6 py-3">Estado</th>
                  <th className="px-6 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {filteredReservations.map(r => (
                  <tr key={r.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-stone-900">{r.clientName || 'Sin Nombre'}</div>
                      <div className="text-[10px] text-stone-400 font-mono">ID: {r.id}</div>
                      {r.aiAnalysis && (
                        <div className="mt-2 text-[11px] p-2 rounded-xl bg-amber-50 text-stone-800 border border-amber-200 space-y-1">
                          <div className="font-bold text-amber-900 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            ✨ Gemini IA: {r.aiAnalysis.clientCategory} — {r.aiAnalysis.recommendedMenuType}
                          </div>
                          {r.aiAnalysis.pitchSummary && (
                            <p className="text-[10.5px] text-stone-600 italic">"{r.aiAnalysis.pitchSummary}"</p>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-stone-800">{r.email}</div>
                      <div className="text-stone-500">{r.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-stone-900">{r.date}</div>
                      <div className="text-stone-500">{r.guests} comensales</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-stone-800">{r.serviceName}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          (r.status || 'pending') === 'pending'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : r.status === 'confirmed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                      >
                        {r.status || 'pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-1">
                      {(r.status || 'pending') === 'pending' && (
                        <button
                          onClick={() => updateStatus(r.id, 'confirmed')}
                          className="px-2 py-1 rounded bg-emerald-600 text-white font-bold text-[10px]"
                        >
                          Confirmar
                        </button>
                      )}
                      {r.status === 'confirmed' && (
                        <button
                          onClick={() => updateStatus(r.id, 'completed')}
                          className="px-2 py-1 rounded bg-blue-600 text-white font-bold text-[10px]"
                        >
                          Completar
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="p-1 rounded text-stone-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
