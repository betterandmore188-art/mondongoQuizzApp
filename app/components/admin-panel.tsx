'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { useAdminAuth } from '@/app/context/adminAuth';

// Fetcher falso para testing
const fakeFetcher = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          name: 'Quiz de Ciencias',
          code: 'QUIZ001',
          questions: 10,
          active: true,
        },
        {
          id: '2',
          name: 'Quiz de Historia',
          code: 'QUIZ002',
          questions: 8,
          active: true,
        },
        {
          id: '3',
          name: 'Quiz de Matemáticas',
          code: 'QUIZ003',
          questions: 15,
          active: true,
        },
      ]);
    }, 500);
  });
};

interface Quiz {
  id: string;
  name: string;
  code: string;
  questions: number;
  active: boolean;
}

export default function AdminPanel() {
  const { logout } = useAdminAuth();
  const [formData, setFormData] = useState({
    name: '',
    questions: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Usar SWR para el fetch falso
  const { data: quizzes = [], isLoading, error } = useSWR(
    'fake-quizzes',
    fakeFetcher,
    { revalidateOnFocus: false }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'questions' ? parseInt(value) : value,
    }));
  };

  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Por favor ingresa un nombre para el quiz');
      return;
    }

    setIsSubmitting(true);

    // Simular creación de quiz con fetch falso
    setTimeout(() => {
      const newCode = `QUIZ${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setSuccessMessage(`✓ Quiz "${formData.name}" creado con código: ${newCode}`);
      setFormData({ name: '', questions: 5 });
      setIsSubmitting(false);

      // Limpiar mensaje después de 5 segundos
      setTimeout(() => setSuccessMessage(''), 5000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-[#1a1a1a]">Panel de Administración</h1>
            <p className="text-gray-600 mt-2">Gestiona tus quizzes</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200"
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario de Crear Quiz */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-bold mb-6 text-[#1a1a1a]">Crear Nuevo Quiz</h2>

              <form onSubmit={handleCreateQuiz} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre del Quiz
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    placeholder="Ej: Quiz de Biología"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#4CAF50] focus:outline-none transition-colors duration-200 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cantidad de Preguntas
                  </label>
                  <select
                    name="questions"
                    value={formData.questions}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#4CAF50] focus:outline-none transition-colors duration-200 disabled:opacity-50"
                  >
                    {[5, 10, 15, 20, 25, 30].map(num => (
                      <option key={num} value={num}>{num} preguntas</option>
                    ))}
                  </select>
                </div>

                {successMessage && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700 text-sm font-medium">
                    {successMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#4CAF50] hover:bg-[#45a049] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200"
                >
                  {isSubmitting ? 'Creando...' : 'Crear Quiz'}
                </button>
              </form>
            </div>
          </div>

          {/* Lista de Quizzes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-[#1a1a1a]">Quizzes Activos</h2>

              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4CAF50]"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-center">
                  Error al cargar los quizzes
                </div>
              ) : quizzes.length === 0 ? (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center text-gray-600">
                  No hay quizzes activos en este momento
                </div>
              ) : (
                <div className="space-y-4">
                  {(quizzes as Quiz[]).map(quiz => (
                    <div
                      key={quiz.id}
                      className="border-2 border-gray-200 rounded-lg p-6 hover:border-[#4CAF50] transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">
                            {quiz.name}
                          </h3>
                          <div className="space-y-2 text-sm text-gray-600">
                            <p>
                              <span className="font-semibold">Código de Ingreso:</span>{' '}
                              <span className="bg-gray-100 px-3 py-1 rounded font-mono text-[#4CAF50] font-bold">
                                {quiz.code}
                              </span>
                            </p>
                            <p>
                              <span className="font-semibold">Preguntas:</span> {quiz.questions}
                            </p>
                            <p>
                              <span className="font-semibold">Estado:</span>{' '}
                              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                                Activo
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
                            Editar
                          </button>
                          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
