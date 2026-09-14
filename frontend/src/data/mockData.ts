/* ─── Colégio Deus Connosco — Dados Centralizados (Moçambique) ─── */

export interface Student {
  id: string;
  name: string;
  email: string;
  classe: string;
  turma: string;
  avatar: string;
  media: number;
  taxaAssiduidade: number;
  estado: 'activo' | 'em_risco' | 'excelente';
}

export interface Guardian {
  id: string;
  name: string;
  email: string;
  phone: string;
  students: string[];
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  departamento: string;
  disciplinas: string[];
  numTurmas: number;
  numAlunos: number;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  teacherId: string;
  teacherName: string;
  tipo: 'curricular' | 'extracurricular';
}

export interface ClassGroup {
  id: string;
  name: string;
  classe: string;
  turma: string;
  studentCount: number;
  directorTurma: string;
}

export interface GradeEntry {
  id: string;
  studentId: string;
  subjectId: string;
  subjectName: string;
  avaliacao: string;
  nota: number;
  maxNota: number;
  trimestre: 1 | 2 | 3;
  tipo: 'ACS1' | 'ACS2' | 'ACP';
  date: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'presente' | 'falta' | 'atraso' | 'justificada';
  disciplina?: string;
  nota?: string;
}

export interface ScheduleSlot {
  id: string;
  day: 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta';
  time: string;
  endTime: string;
  subject: string;
  teacher: string;
  room: string;
  classGroup: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  tipo?: 'curricular' | 'extracurricular';
}

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  conceito: string;
  amount: number;
  paidAmount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pendente' | 'pago' | 'atrasado' | 'parcial' | 'em_revisao' | 'validado' | 'rejeitado';
  metodo?: string;
  referencia?: string;
}

export interface Obligation {
  id: string;
  conceito: string;
  amount: number;
  dueDate: string;
  categoria: 'propina' | 'multa' | 'material' | 'actividade' | 'matricula';
  studentId: string;
  studentName: string;
  status: 'activo' | 'pago' | 'atrasado';
}

export interface FinanceAccount {
  id: string;
  studentId: string;
  studentName: string;
  totalDevido: number;
  totalPago: number;
  saldo: number;
  ultimoPagamento?: string;
  status: 'regular' | 'inadimplente' | 'quite';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'nota' | 'assiduidade' | 'pagamento' | 'aviso' | 'alerta' | 'mensagem';
  timestamp: string;
  read: boolean;
}

export interface FeedItem {
  id: string;
  author: string;
  authorRole: string;
  title: string;
  content: string;
  timestamp: string;
  category: 'aviso' | 'academico' | 'evento' | 'geral';
  pinned?: boolean;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  description: string;
  disciplina: string;
  type: 'documento' | 'video' | 'questionario' | 'apresentacao' | 'link';
  author: string;
  date: string;
  size?: string;
}

export interface Assessment {
  id: string;
  title: string;
  disciplina: string;
  turma: string;
  tipo: 'ACS1' | 'ACS2' | 'ACP';
  date: string;
  trimestre: 1 | 2 | 3;
  status: 'rascunho' | 'publicado' | 'corrigido' | 'agendado';
  totalAlunos: number;
  corrigidos: number;
}

/* ═══════════════════════════════════════════ */
/*               DADOS                         */
/* ═══════════════════════════════════════════ */

export const students: Student[] = [
  { id: 'ALU-001', name: 'Amélia Mondlane', email: 'amelia.m@escola.mz', classe: '11', turma: 'A', avatar: 'AM', media: 14.8, taxaAssiduidade: 92, estado: 'activo' },
  { id: 'ALU-002', name: 'Carlos Macuácua', email: 'carlos.m@escola.mz', classe: '11', turma: 'A', avatar: 'CM', media: 8.5, taxaAssiduidade: 68, estado: 'em_risco' },
  { id: 'ALU-003', name: 'Fátima Nhantumbo', email: 'fatima.n@escola.mz', classe: '12', turma: 'A', avatar: 'FN', media: 7.2, taxaAssiduidade: 60, estado: 'em_risco' },
  { id: 'ALU-004', name: 'João Sitoe', email: 'joao.s@escola.mz', classe: '10', turma: 'A', avatar: 'JS', media: 17.3, taxaAssiduidade: 97, estado: 'excelente' },
  { id: 'ALU-005', name: 'Marta Cossa', email: 'marta.c@escola.mz', classe: '11', turma: 'B', avatar: 'MC', media: 12.1, taxaAssiduidade: 85, estado: 'activo' },
  { id: 'ALU-006', name: 'Pedro Guambe', email: 'pedro.g@escola.mz', classe: '10', turma: 'B', avatar: 'PG', media: 9.4, taxaAssiduidade: 72, estado: 'em_risco' },
  { id: 'ALU-007', name: 'Rosa Tembe', email: 'rosa.t@escola.mz', classe: '12', turma: 'B', avatar: 'RT', media: 15.6, taxaAssiduidade: 94, estado: 'excelente' },
  { id: 'ALU-008', name: 'Samuel Langa', email: 'samuel.l@escola.mz', classe: '11', turma: 'A', avatar: 'SL', media: 16.2, taxaAssiduidade: 96, estado: 'excelente' },
];

export const guardians: Guardian[] = [
  { id: 'ENC-001', name: 'Helena Mondlane', email: 'helena.m@email.mz', phone: '+258 84 123 4567', students: ['ALU-001'] },
  { id: 'ENC-002', name: 'Alberto Macuácua', email: 'alberto.m@email.mz', phone: '+258 84 234 5678', students: ['ALU-002'] },
  { id: 'ENC-003', name: 'Maria Sitoe', email: 'maria.s@email.mz', phone: '+258 84 345 6789', students: ['ALU-004'] },
];

export const teachers: Teacher[] = [
  { id: 'PROF-001', name: 'Prof. António Magaia', email: 'a.magaia@escola.mz', departamento: 'Matemática', disciplinas: ['Matemática', 'Estatística'], numTurmas: 4, numAlunos: 128 },
  { id: 'PROF-002', name: 'Prof.ª Graça Machel', email: 'g.machel@escola.mz', departamento: 'Ciências', disciplinas: ['Física', 'Física Aplicada'], numTurmas: 3, numAlunos: 96 },
  { id: 'PROF-003', name: 'Prof. Daniel Chissano', email: 'd.chissano@escola.mz', departamento: 'Ciências', disciplinas: ['Química'], numTurmas: 3, numAlunos: 88 },
  { id: 'PROF-004', name: 'Prof.ª Lúcia Ribeiro', email: 'l.ribeiro@escola.mz', departamento: 'Línguas', disciplinas: ['Português', 'Inglês'], numTurmas: 4, numAlunos: 120 },
  { id: 'PROF-005', name: 'Prof. Zhang Wei', email: 'z.wei@escola.mz', departamento: 'Línguas Estrangeiras', disciplinas: ['Mandarim'], numTurmas: 3, numAlunos: 75 },
  { id: 'PROF-006', name: 'Prof.ª Sarah Johnson', email: 's.johnson@escola.mz', departamento: 'Línguas Estrangeiras', disciplinas: ['Inglês Extra'], numTurmas: 3, numAlunos: 80 },
  { id: 'PROF-007', name: 'Prof. Kim Soo-jin', email: 'k.soojin@escola.mz', departamento: 'Línguas Estrangeiras', disciplinas: ['Coreano'], numTurmas: 2, numAlunos: 45 },
  { id: 'PROF-008', name: 'Prof. Ernesto Vilankulo', email: 'e.vilankulo@escola.mz', departamento: 'Biologia', disciplinas: ['Biologia', 'Ecologia'], numTurmas: 3, numAlunos: 94 },
];

export const subjects: Subject[] = [
  { id: 'DISC-001', name: 'Matemática', code: 'MAT', teacherId: 'PROF-001', teacherName: 'Prof. António Magaia', tipo: 'curricular' },
  { id: 'DISC-002', name: 'Física', code: 'FIS', teacherId: 'PROF-002', teacherName: 'Prof.ª Graça Machel', tipo: 'curricular' },
  { id: 'DISC-003', name: 'Química', code: 'QUI', teacherId: 'PROF-003', teacherName: 'Prof. Daniel Chissano', tipo: 'curricular' },
  { id: 'DISC-004', name: 'Português', code: 'POR', teacherId: 'PROF-004', teacherName: 'Prof.ª Lúcia Ribeiro', tipo: 'curricular' },
  { id: 'DISC-005', name: 'Biologia', code: 'BIO', teacherId: 'PROF-008', teacherName: 'Prof. Ernesto Vilankulo', tipo: 'curricular' },
  { id: 'DISC-006', name: 'Inglês', code: 'ING', teacherId: 'PROF-004', teacherName: 'Prof.ª Lúcia Ribeiro', tipo: 'curricular' },
  { id: 'DISC-007', name: 'Mandarim', code: 'MAN', teacherId: 'PROF-005', teacherName: 'Prof. Zhang Wei', tipo: 'extracurricular' },
  { id: 'DISC-008', name: 'Inglês Extra', code: 'IEX', teacherId: 'PROF-006', teacherName: 'Prof.ª Sarah Johnson', tipo: 'extracurricular' },
  { id: 'DISC-009', name: 'Coreano', code: 'COR', teacherId: 'PROF-007', teacherName: 'Prof. Kim Soo-jin', tipo: 'extracurricular' },
];

export const classGroups: ClassGroup[] = [
  { id: 'TUR-001', name: '10ª A', classe: '10', turma: 'A', studentCount: 32, directorTurma: 'Prof.ª Lúcia Ribeiro' },
  { id: 'TUR-002', name: '10ª B', classe: '10', turma: 'B', studentCount: 30, directorTurma: 'Prof. Ernesto Vilankulo' },
  { id: 'TUR-003', name: '11ª A', classe: '11', turma: 'A', studentCount: 28, directorTurma: 'Prof.ª Graça Machel' },
  { id: 'TUR-004', name: '11ª B', classe: '11', turma: 'B', studentCount: 31, directorTurma: 'Prof. António Magaia' },
  { id: 'TUR-005', name: '12ª A', classe: '12', turma: 'A', studentCount: 26, directorTurma: 'Prof. Daniel Chissano' },
  { id: 'TUR-006', name: '12ª B', classe: '12', turma: 'B', studentCount: 29, directorTurma: 'Prof. António Magaia' },
];

// Grading: 0-20, MT = (ACS1+ACS2+ACP)/3, MA = (MT1+MT2+MT3)/3
export const grades: GradeEntry[] = [
  // ALU-001 Amélia — Trimestre 2
  { id: 'NT-01', studentId: 'ALU-001', subjectId: 'DISC-001', subjectName: 'Matemática', avaliacao: 'ACS1 — 2º Trimestre', nota: 16, maxNota: 20, trimestre: 2, tipo: 'ACS1', date: '2026-03-10' },
  { id: 'NT-02', studentId: 'ALU-001', subjectId: 'DISC-001', subjectName: 'Matemática', avaliacao: 'ACS2 — 2º Trimestre', nota: 14, maxNota: 20, trimestre: 2, tipo: 'ACS2', date: '2026-04-05' },
  { id: 'NT-03', studentId: 'ALU-001', subjectId: 'DISC-002', subjectName: 'Física', avaliacao: 'ACS1 — 2º Trimestre', nota: 13, maxNota: 20, trimestre: 2, tipo: 'ACS1', date: '2026-03-12' },
  { id: 'NT-04', studentId: 'ALU-001', subjectId: 'DISC-002', subjectName: 'Física', avaliacao: 'ACP — 2º Trimestre', nota: 15, maxNota: 20, trimestre: 2, tipo: 'ACP', date: '2026-04-08' },
  { id: 'NT-05', studentId: 'ALU-001', subjectId: 'DISC-003', subjectName: 'Química', avaliacao: 'ACS1 — 2º Trimestre', nota: 17, maxNota: 20, trimestre: 2, tipo: 'ACS1', date: '2026-03-14' },
  { id: 'NT-06', studentId: 'ALU-001', subjectId: 'DISC-004', subjectName: 'Português', avaliacao: 'ACS1 — 2º Trimestre', nota: 15, maxNota: 20, trimestre: 2, tipo: 'ACS1', date: '2026-03-08' },
  { id: 'NT-07', studentId: 'ALU-001', subjectId: 'DISC-005', subjectName: 'Biologia', avaliacao: 'ACS1 — 2º Trimestre', nota: 11, maxNota: 20, trimestre: 2, tipo: 'ACS1', date: '2026-03-16' },
  { id: 'NT-08', studentId: 'ALU-001', subjectId: 'DISC-006', subjectName: 'Inglês', avaliacao: 'ACS1 — 2º Trimestre', nota: 18, maxNota: 20, trimestre: 2, tipo: 'ACS1', date: '2026-03-18' },
  { id: 'NT-09', studentId: 'ALU-001', subjectId: 'DISC-007', subjectName: 'Mandarim', avaliacao: 'ACS1 — 2º Trimestre', nota: 12, maxNota: 20, trimestre: 2, tipo: 'ACS1', date: '2026-03-20' },
  { id: 'NT-10', studentId: 'ALU-001', subjectId: 'DISC-009', subjectName: 'Coreano', avaliacao: 'ACS1 — 2º Trimestre', nota: 14, maxNota: 20, trimestre: 2, tipo: 'ACS1', date: '2026-03-22' },
  // ALU-002 Carlos
  { id: 'NT-11', studentId: 'ALU-002', subjectId: 'DISC-001', subjectName: 'Matemática', avaliacao: 'ACS1 — 2º Trimestre', nota: 7, maxNota: 20, trimestre: 2, tipo: 'ACS1', date: '2026-03-10' },
  { id: 'NT-12', studentId: 'ALU-002', subjectId: 'DISC-002', subjectName: 'Física', avaliacao: 'ACS1 — 2º Trimestre', nota: 9, maxNota: 20, trimestre: 2, tipo: 'ACS1', date: '2026-03-12' },
  // ALU-003 Fátima
  { id: 'NT-13', studentId: 'ALU-003', subjectId: 'DISC-001', subjectName: 'Matemática', avaliacao: 'ACS1 — 2º Trimestre', nota: 6, maxNota: 20, trimestre: 2, tipo: 'ACS1', date: '2026-03-10' },
  // ALU-004 João
  { id: 'NT-14', studentId: 'ALU-004', subjectId: 'DISC-001', subjectName: 'Matemática', avaliacao: 'ACS1 — 2º Trimestre', nota: 19, maxNota: 20, trimestre: 2, tipo: 'ACS1', date: '2026-03-10' },
  { id: 'NT-15', studentId: 'ALU-004', subjectId: 'DISC-001', subjectName: 'Matemática', avaliacao: 'ACS2 — 2º Trimestre', nota: 18, maxNota: 20, trimestre: 2, tipo: 'ACS2', date: '2026-04-05' },
  { id: 'NT-16', studentId: 'ALU-004', subjectId: 'DISC-001', subjectName: 'Matemática', avaliacao: 'ACP — 2º Trimestre', nota: 17, maxNota: 20, trimestre: 2, tipo: 'ACP', date: '2026-04-10' },
];

export const attendanceRecords: AttendanceRecord[] = [
  { id: 'ASS-001', studentId: 'ALU-001', date: '2026-04-11', status: 'presente', disciplina: 'Matemática' },
  { id: 'ASS-002', studentId: 'ALU-001', date: '2026-04-11', status: 'presente', disciplina: 'Física' },
  { id: 'ASS-003', studentId: 'ALU-001', date: '2026-04-10', status: 'atraso', disciplina: 'Química', nota: 'Chegou 10 min atrasada' },
  { id: 'ASS-004', studentId: 'ALU-001', date: '2026-04-09', status: 'falta', disciplina: 'Biologia', nota: 'Consulta médica' },
  { id: 'ASS-005', studentId: 'ALU-001', date: '2026-04-08', status: 'presente', disciplina: 'Português' },
  { id: 'ASS-006', studentId: 'ALU-001', date: '2026-04-07', status: 'presente', disciplina: 'Inglês' },
  { id: 'ASS-007', studentId: 'ALU-001', date: '2026-04-04', status: 'justificada', disciplina: 'Matemática', nota: 'Evento escolar' },
  { id: 'ASS-008', studentId: 'ALU-001', date: '2026-04-03', status: 'presente', disciplina: 'Mandarim' },
  { id: 'ASS-009', studentId: 'ALU-002', date: '2026-04-11', status: 'falta', disciplina: 'Matemática' },
  { id: 'ASS-010', studentId: 'ALU-002', date: '2026-04-10', status: 'falta', disciplina: 'Física' },
  { id: 'ASS-011', studentId: 'ALU-002', date: '2026-04-09', status: 'falta', disciplina: 'Química' },
  { id: 'ASS-012', studentId: 'ALU-003', date: '2026-04-11', status: 'atraso', disciplina: 'Matemática' },
];

const today = new Date();
const dayOfWeek = today.getDay();

function getSlotStatus(dayIndex: number, hour: number, minute: number = 0): 'upcoming' | 'ongoing' | 'completed' {
  const currentDayIdx = dayOfWeek - 1; // Seg=0
  if (dayIndex < currentDayIdx) return 'completed';
  if (dayIndex > currentDayIdx) return 'upcoming';
  const now = today.getHours() * 60 + today.getMinutes();
  const slotStart = hour * 60 + minute;
  const slotEnd = slotStart + 45;
  if (now >= slotEnd) return 'completed';
  if (now >= slotStart) return 'ongoing';
  return 'upcoming';
}

// Horário: 07:30-12:30, aulas de 45 min
export const weeklySchedule: ScheduleSlot[] = [
  // Segunda
  { id: 'HOR-001', day: 'Segunda', time: '07:30', endTime: '08:15', subject: 'Matemática', teacher: 'Prof. António Magaia', room: 'Sala 201', classGroup: '11ª A', status: getSlotStatus(0, 7, 30) },
  { id: 'HOR-002', day: 'Segunda', time: '08:15', endTime: '09:00', subject: 'Matemática', teacher: 'Prof. António Magaia', room: 'Sala 201', classGroup: '11ª A', status: getSlotStatus(0, 8, 15) },
  { id: 'HOR-003', day: 'Segunda', time: '09:15', endTime: '10:00', subject: 'Física', teacher: 'Prof.ª Graça Machel', room: 'Lab. 102', classGroup: '11ª A', status: getSlotStatus(0, 9, 15) },
  { id: 'HOR-004', day: 'Segunda', time: '10:00', endTime: '10:45', subject: 'Física', teacher: 'Prof.ª Graça Machel', room: 'Lab. 102', classGroup: '11ª A', status: getSlotStatus(0, 10, 0) },
  { id: 'HOR-005', day: 'Segunda', time: '11:00', endTime: '11:45', subject: 'Português', teacher: 'Prof.ª Lúcia Ribeiro', room: 'Sala 305', classGroup: '11ª A', status: getSlotStatus(0, 11, 0) },
  { id: 'HOR-006', day: 'Segunda', time: '11:45', endTime: '12:30', subject: 'Inglês', teacher: 'Prof.ª Lúcia Ribeiro', room: 'Sala 305', classGroup: '11ª A', status: getSlotStatus(0, 11, 45) },
  // Terça
  { id: 'HOR-007', day: 'Terça', time: '07:30', endTime: '08:15', subject: 'Química', teacher: 'Prof. Daniel Chissano', room: 'Lab. 103', classGroup: '11ª A', status: getSlotStatus(1, 7, 30) },
  { id: 'HOR-008', day: 'Terça', time: '08:15', endTime: '09:00', subject: 'Química', teacher: 'Prof. Daniel Chissano', room: 'Lab. 103', classGroup: '11ª A', status: getSlotStatus(1, 8, 15) },
  { id: 'HOR-009', day: 'Terça', time: '09:15', endTime: '10:00', subject: 'Biologia', teacher: 'Prof. Ernesto Vilankulo', room: 'Lab. 201', classGroup: '11ª A', status: getSlotStatus(1, 9, 15) },
  { id: 'HOR-010', day: 'Terça', time: '10:00', endTime: '10:45', subject: 'Mandarim', teacher: 'Prof. Zhang Wei', room: 'Sala 110', classGroup: '11ª A', status: getSlotStatus(1, 10, 0), tipo: 'extracurricular' },
  { id: 'HOR-011', day: 'Terça', time: '11:00', endTime: '11:45', subject: 'Matemática', teacher: 'Prof. António Magaia', room: 'Sala 201', classGroup: '11ª A', status: getSlotStatus(1, 11, 0) },
  { id: 'HOR-012', day: 'Terça', time: '11:45', endTime: '12:30', subject: 'Inglês Extra', teacher: 'Prof.ª Sarah Johnson', room: 'Sala 112', classGroup: '11ª A', status: getSlotStatus(1, 11, 45), tipo: 'extracurricular' },
  // Quarta
  { id: 'HOR-013', day: 'Quarta', time: '07:30', endTime: '08:15', subject: 'Física', teacher: 'Prof.ª Graça Machel', room: 'Sala 204', classGroup: '11ª A', status: getSlotStatus(2, 7, 30) },
  { id: 'HOR-014', day: 'Quarta', time: '08:15', endTime: '09:00', subject: 'Biologia', teacher: 'Prof. Ernesto Vilankulo', room: 'Lab. 201', classGroup: '11ª A', status: getSlotStatus(2, 8, 15) },
  { id: 'HOR-015', day: 'Quarta', time: '09:15', endTime: '10:00', subject: 'Português', teacher: 'Prof.ª Lúcia Ribeiro', room: 'Sala 305', classGroup: '11ª A', status: getSlotStatus(2, 9, 15) },
  { id: 'HOR-016', day: 'Quarta', time: '10:00', endTime: '10:45', subject: 'Coreano', teacher: 'Prof. Kim Soo-jin', room: 'Sala 115', classGroup: '11ª A', status: getSlotStatus(2, 10, 0), tipo: 'extracurricular' },
  { id: 'HOR-017', day: 'Quarta', time: '11:00', endTime: '11:45', subject: 'Química', teacher: 'Prof. Daniel Chissano', room: 'Lab. 103', classGroup: '11ª A', status: getSlotStatus(2, 11, 0) },
  { id: 'HOR-018', day: 'Quarta', time: '11:45', endTime: '12:30', subject: 'Inglês', teacher: 'Prof.ª Lúcia Ribeiro', room: 'Sala 305', classGroup: '11ª A', status: getSlotStatus(2, 11, 45) },
  // Quinta
  { id: 'HOR-019', day: 'Quinta', time: '07:30', endTime: '08:15', subject: 'Matemática', teacher: 'Prof. António Magaia', room: 'Sala 201', classGroup: '11ª A', status: getSlotStatus(3, 7, 30) },
  { id: 'HOR-020', day: 'Quinta', time: '08:15', endTime: '09:00', subject: 'Matemática', teacher: 'Prof. António Magaia', room: 'Sala 201', classGroup: '11ª A', status: getSlotStatus(3, 8, 15) },
  { id: 'HOR-021', day: 'Quinta', time: '09:15', endTime: '10:00', subject: 'Física', teacher: 'Prof.ª Graça Machel', room: 'Lab. 102', classGroup: '11ª A', status: getSlotStatus(3, 9, 15) },
  { id: 'HOR-022', day: 'Quinta', time: '10:00', endTime: '10:45', subject: 'Mandarim', teacher: 'Prof. Zhang Wei', room: 'Sala 110', classGroup: '11ª A', status: getSlotStatus(3, 10, 0), tipo: 'extracurricular' },
  { id: 'HOR-023', day: 'Quinta', time: '11:00', endTime: '11:45', subject: 'Biologia', teacher: 'Prof. Ernesto Vilankulo', room: 'Sala 301', classGroup: '11ª A', status: getSlotStatus(3, 11, 0) },
  { id: 'HOR-024', day: 'Quinta', time: '11:45', endTime: '12:30', subject: 'Português', teacher: 'Prof.ª Lúcia Ribeiro', room: 'Sala 305', classGroup: '11ª A', status: getSlotStatus(3, 11, 45) },
  // Sexta
  { id: 'HOR-025', day: 'Sexta', time: '07:30', endTime: '08:15', subject: 'Biologia', teacher: 'Prof. Ernesto Vilankulo', room: 'Sala 301', classGroup: '11ª A', status: getSlotStatus(4, 7, 30) },
  { id: 'HOR-026', day: 'Sexta', time: '08:15', endTime: '09:00', subject: 'Química', teacher: 'Prof. Daniel Chissano', room: 'Lab. 103', classGroup: '11ª A', status: getSlotStatus(4, 8, 15) },
  { id: 'HOR-027', day: 'Sexta', time: '09:15', endTime: '10:00', subject: 'Inglês', teacher: 'Prof.ª Lúcia Ribeiro', room: 'Sala 305', classGroup: '11ª A', status: getSlotStatus(4, 9, 15) },
  { id: 'HOR-028', day: 'Sexta', time: '10:00', endTime: '10:45', subject: 'Coreano', teacher: 'Prof. Kim Soo-jin', room: 'Sala 115', classGroup: '11ª A', status: getSlotStatus(4, 10, 0), tipo: 'extracurricular' },
  { id: 'HOR-029', day: 'Sexta', time: '11:00', endTime: '11:45', subject: 'Matemática', teacher: 'Prof. António Magaia', room: 'Sala 201', classGroup: '11ª A', status: getSlotStatus(4, 11, 0) },
];

// Horário do professor (Prof. António Magaia)
export const teacherSchedule: ScheduleSlot[] = [
  { id: 'PHOR-001', day: 'Segunda', time: '07:30', endTime: '09:00', subject: 'Matemática', teacher: 'Prof. António Magaia', room: 'Sala 201', classGroup: '11ª A', status: getSlotStatus(0, 7, 30) },
  { id: 'PHOR-002', day: 'Segunda', time: '09:15', endTime: '10:45', subject: 'Matemática', teacher: 'Prof. António Magaia', room: 'Sala 203', classGroup: '11ª B', status: getSlotStatus(0, 9, 15) },
  { id: 'PHOR-003', day: 'Segunda', time: '11:00', endTime: '12:30', subject: 'Estatística', teacher: 'Prof. António Magaia', room: 'Sala 105', classGroup: '12ª A', status: getSlotStatus(0, 11, 0) },
  { id: 'PHOR-004', day: 'Terça', time: '07:30', endTime: '09:00', subject: 'Matemática', teacher: 'Prof. António Magaia', room: 'Sala 202', classGroup: '10ª A', status: getSlotStatus(1, 7, 30) },
  { id: 'PHOR-005', day: 'Terça', time: '11:00', endTime: '11:45', subject: 'Matemática', teacher: 'Prof. António Magaia', room: 'Sala 201', classGroup: '11ª A', status: getSlotStatus(1, 11, 0) },
  { id: 'PHOR-006', day: 'Quarta', time: '07:30', endTime: '09:00', subject: 'Matemática', teacher: 'Prof. António Magaia', room: 'Sala 202', classGroup: '10ª B', status: getSlotStatus(2, 7, 30) },
  { id: 'PHOR-007', day: 'Quarta', time: '09:15', endTime: '10:45', subject: 'Estatística', teacher: 'Prof. António Magaia', room: 'Sala 105', classGroup: '12ª B', status: getSlotStatus(2, 9, 15) },
  { id: 'PHOR-008', day: 'Quinta', time: '07:30', endTime: '09:00', subject: 'Matemática', teacher: 'Prof. António Magaia', room: 'Sala 201', classGroup: '11ª A', status: getSlotStatus(3, 7, 30) },
  { id: 'PHOR-009', day: 'Quinta', time: '09:15', endTime: '10:45', subject: 'Matemática', teacher: 'Prof. António Magaia', room: 'Sala 203', classGroup: '11ª B', status: getSlotStatus(3, 9, 15) },
  { id: 'PHOR-010', day: 'Sexta', time: '11:00', endTime: '11:45', subject: 'Matemática', teacher: 'Prof. António Magaia', room: 'Sala 201', classGroup: '11ª A', status: getSlotStatus(4, 11, 0) },
  { id: 'PHOR-011', day: 'Sexta', time: '09:15', endTime: '10:45', subject: 'Matemática', teacher: 'Prof. António Magaia', room: 'Sala 201', classGroup: '10ª B', status: getSlotStatus(4, 9, 15) },
];

export const payments: Payment[] = [
  { id: 'PAG-001', studentId: 'ALU-001', studentName: 'Amélia Mondlane', conceito: 'Propina — 2º Trimestre', amount: 15000, paidAmount: 0, dueDate: '2026-04-30', status: 'pendente' },
  { id: 'PAG-002', studentId: 'ALU-001', studentName: 'Amélia Mondlane', conceito: 'Material Escolar', amount: 2500, paidAmount: 0, dueDate: '2026-04-15', status: 'pendente' },
  { id: 'PAG-003', studentId: 'ALU-001', studentName: 'Amélia Mondlane', conceito: 'Multa — Atraso de Pagamento', amount: 500, paidAmount: 0, dueDate: '2026-03-15', status: 'atrasado' },
  { id: 'PAG-004', studentId: 'ALU-001', studentName: 'Amélia Mondlane', conceito: 'Propina — 1º Trimestre', amount: 15000, paidAmount: 15000, dueDate: '2026-01-15', paidDate: '2026-01-10', status: 'pago', metodo: 'M-Pesa', referencia: 'MPESA-20260110-001' },
  { id: 'PAG-005', studentId: 'ALU-002', studentName: 'Carlos Macuácua', conceito: 'Propina — 2º Trimestre', amount: 15000, paidAmount: 15000, dueDate: '2026-04-01', paidDate: '2026-04-05', status: 'em_revisao', metodo: 'Transferência Bancária', referencia: 'BCI-20260405-002' },
  { id: 'PAG-006', studentId: 'ALU-003', studentName: 'Fátima Nhantumbo', conceito: 'Matrícula', amount: 5000, paidAmount: 5000, dueDate: '2026-02-01', paidDate: '2026-01-28', status: 'validado', metodo: 'Depósito', referencia: 'DEP-20260128-003' },
  { id: 'PAG-007', studentId: 'ALU-004', studentName: 'João Sitoe', conceito: 'Propina — 1º Trimestre', amount: 15000, paidAmount: 0, dueDate: '2025-12-15', status: 'atrasado' },
  { id: 'PAG-008', studentId: 'ALU-005', studentName: 'Marta Cossa', conceito: 'Propina — 2º Trimestre', amount: 15000, paidAmount: 0, dueDate: '2026-04-15', status: 'atrasado' },
  { id: 'PAG-009', studentId: 'ALU-006', studentName: 'Pedro Guambe', conceito: 'Propina — 2º Trimestre', amount: 15000, paidAmount: 7500, dueDate: '2026-03-30', status: 'parcial', metodo: 'M-Pesa' },
  { id: 'PAG-010', studentId: 'ALU-007', studentName: 'Rosa Tembe', conceito: 'Propina — 2º Trimestre', amount: 15000, paidAmount: 15000, dueDate: '2026-04-01', paidDate: '2026-03-29', status: 'em_revisao', metodo: 'Transferência Bancária' },
  { id: 'PAG-011', studentId: 'ALU-008', studentName: 'Samuel Langa', conceito: 'Material de Laboratório', amount: 3000, paidAmount: 0, dueDate: '2026-04-30', status: 'pendente' },
  { id: 'PAG-012', studentId: 'ALU-002', studentName: 'Carlos Macuácua', conceito: 'Multa — Atraso', amount: 1500, paidAmount: 1500, dueDate: '2026-04-01', paidDate: '2026-04-08', status: 'rejeitado', metodo: 'M-Pesa', referencia: 'MPESA-20260408-011' },
];

export const obligations: Obligation[] = [
  { id: 'OBR-001', conceito: 'Propina — 2º Trimestre', amount: 15000, dueDate: '2026-04-30', categoria: 'propina', studentId: 'ALU-001', studentName: 'Amélia Mondlane', status: 'activo' },
  { id: 'OBR-002', conceito: 'Material Escolar', amount: 2500, dueDate: '2026-04-15', categoria: 'material', studentId: 'ALU-001', studentName: 'Amélia Mondlane', status: 'activo' },
  { id: 'OBR-003', conceito: 'Multa — Atraso', amount: 500, dueDate: '2026-03-15', categoria: 'multa', studentId: 'ALU-001', studentName: 'Amélia Mondlane', status: 'atrasado' },
  { id: 'OBR-004', conceito: 'Propina — 1º Trimestre', amount: 15000, dueDate: '2026-01-15', categoria: 'propina', studentId: 'ALU-001', studentName: 'Amélia Mondlane', status: 'pago' },
  { id: 'OBR-005', conceito: 'Matrícula', amount: 5000, dueDate: '2026-02-01', categoria: 'matricula', studentId: 'ALU-003', studentName: 'Fátima Nhantumbo', status: 'pago' },
  { id: 'OBR-006', conceito: 'Propina — 1º Trimestre', amount: 15000, dueDate: '2025-12-15', categoria: 'propina', studentId: 'ALU-004', studentName: 'João Sitoe', status: 'atrasado' },
  { id: 'OBR-007', conceito: 'Propina — 2º Trimestre', amount: 15000, dueDate: '2026-04-15', categoria: 'propina', studentId: 'ALU-005', studentName: 'Marta Cossa', status: 'atrasado' },
  { id: 'OBR-008', conceito: 'Propina — 2º Trimestre', amount: 15000, dueDate: '2026-03-30', categoria: 'propina', studentId: 'ALU-006', studentName: 'Pedro Guambe', status: 'activo' },
];

export const financeAccounts: FinanceAccount[] = [
  { id: 'CTA-001', studentId: 'ALU-001', studentName: 'Amélia Mondlane', totalDevido: 33000, totalPago: 15000, saldo: 18000, ultimoPagamento: '2026-01-10', status: 'regular' },
  { id: 'CTA-002', studentId: 'ALU-002', studentName: 'Carlos Macuácua', totalDevido: 31500, totalPago: 15000, saldo: 16500, ultimoPagamento: '2026-04-05', status: 'regular' },
  { id: 'CTA-003', studentId: 'ALU-003', studentName: 'Fátima Nhantumbo', totalDevido: 20000, totalPago: 5000, saldo: 15000, ultimoPagamento: '2026-01-28', status: 'regular' },
  { id: 'CTA-004', studentId: 'ALU-004', studentName: 'João Sitoe', totalDevido: 30000, totalPago: 15000, saldo: 15000, status: 'inadimplente' },
  { id: 'CTA-005', studentId: 'ALU-005', studentName: 'Marta Cossa', totalDevido: 30000, totalPago: 15000, saldo: 15000, status: 'inadimplente' },
  { id: 'CTA-006', studentId: 'ALU-006', studentName: 'Pedro Guambe', totalDevido: 30000, totalPago: 22500, saldo: 7500, ultimoPagamento: '2026-03-15', status: 'regular' },
  { id: 'CTA-007', studentId: 'ALU-007', studentName: 'Rosa Tembe', totalDevido: 30000, totalPago: 30000, saldo: 0, ultimoPagamento: '2026-03-29', status: 'quite' },
  { id: 'CTA-008', studentId: 'ALU-008', studentName: 'Samuel Langa', totalDevido: 33000, totalPago: 30000, saldo: 3000, ultimoPagamento: '2026-02-20', status: 'regular' },
];

export const notifications: NotificationItem[] = [
  { id: 'NOT-001', title: 'Nova Nota Publicada', message: 'Matemática — ACS1 2º Trimestre: 16/20', type: 'nota', timestamp: '2026-04-11T10:30:00', read: false },
  { id: 'NOT-002', title: 'Alerta de Assiduidade', message: 'Falta registada em Biologia no dia 9 de Abril', type: 'assiduidade', timestamp: '2026-04-09T16:00:00', read: false },
  { id: 'NOT-003', title: 'Pagamento em Atraso', message: 'Multa de 500 MT está vencida desde 15 de Março', type: 'pagamento', timestamp: '2026-03-16T09:00:00', read: false },
  { id: 'NOT-004', title: 'Calendário de Provas Publicado', message: 'O calendário de provas do 2º Trimestre já está disponível', type: 'aviso', timestamp: '2026-04-07T08:00:00', read: true },
  { id: 'NOT-005', title: 'Biologia Precisa de Atenção', message: 'O seu desempenho em Biologia está abaixo da média. Reveja os materiais.', type: 'alerta', timestamp: '2026-04-06T14:00:00', read: true },
  { id: 'NOT-006', title: 'Mensagem do Prof. Magaia', message: 'Excelente desempenho na ACS1! Continue assim.', type: 'mensagem', timestamp: '2026-04-05T11:30:00', read: true },
  { id: 'NOT-007', title: 'Relatório de Laboratório', message: 'O relatório de Química #5 deve ser entregue até 14 de Abril', type: 'aviso', timestamp: '2026-04-03T09:00:00', read: true },
  { id: 'NOT-008', title: 'Pagamento Confirmado', message: 'Propina do 1º Trimestre confirmada — 15.000 MT', type: 'pagamento', timestamp: '2026-01-10T12:00:00', read: true },
];

export const feedItems: FeedItem[] = [
  { id: 'PUB-001', author: 'Direcção', authorRole: 'Direcção', title: 'Calendário de Provas do 2º Trimestre', content: 'O calendário de provas do 2º Trimestre foi publicado. Verifiquem o horário na vossa página de agenda. Contactem a secretaria para eventuais conflitos.', timestamp: '2026-04-07T08:00:00', category: 'aviso', pinned: true },
  { id: 'PUB-002', author: 'Prof. Ernesto Vilankulo', authorRole: 'Professor', title: 'Visita de Estudo — Biologia', content: 'Visita ao Jardim Botânico Nacional no dia 18 de Abril. As autorizações devem ser entregues até 14 de Abril. Tragam roupa confortável e caderno de notas.', timestamp: '2026-04-06T14:30:00', category: 'evento' },
  { id: 'PUB-003', author: 'Prof.ª Graça Machel', authorRole: 'Professora', title: 'Segurança no Laboratório de Física', content: 'Todos os alunos devem usar óculos de protecção e sapatos fechados durante as sessões de laboratório. Alunos sem equipamento adequado não poderão participar.', timestamp: '2026-04-05T10:00:00', category: 'academico' },
  { id: 'PUB-004', author: 'Conselho de Alunos', authorRole: 'Alunos', title: 'Voluntários para a Feira Cultural', content: 'Precisamos de voluntários para a Feira Cultural do dia 2 de Maio. Ajuda com decoração, bancas de comida e espectáculos. Inscrevam-se na associação de estudantes.', timestamp: '2026-04-04T13:00:00', category: 'evento' },
  { id: 'PUB-005', author: 'Prof. António Magaia', authorRole: 'Professor', title: 'Matemática — Horas Extra de Apoio', content: 'Estarei disponível para sessões extra esta semana: Quarta 14h-16h e Quinta 14h-16h na Sala 201. Venham preparados com dúvidas dos capítulos 7-9.', timestamp: '2026-04-03T09:00:00', category: 'academico' },
  { id: 'PUB-006', author: 'Direcção', authorRole: 'Direcção', title: 'Encerramento — Feriado Nacional', content: 'A escola estará encerrada no dia 21 de Abril por motivo de feriado nacional. Todas as actividades estão suspensas. O horário normal retoma no dia 22 de Abril.', timestamp: '2026-04-02T08:00:00', category: 'aviso' },
];

export const knowledgeItems: KnowledgeItem[] = [
  { id: 'CON-001', title: 'Cálculo: Limites e Continuidade', description: 'Guia completo sobre limites, continuidade e a definição épsilon-delta.', disciplina: 'Matemática', type: 'documento', author: 'Prof. António Magaia', date: '2026-03-28', size: '2.4 MB' },
  { id: 'CON-002', title: 'Leis de Newton', description: 'Vídeo-aula sobre as três leis do movimento com exemplos do dia-a-dia.', disciplina: 'Física', type: 'video', author: 'Prof.ª Graça Machel', date: '2026-03-25', size: '145 MB' },
  { id: 'CON-003', title: 'Introdução à Química Orgânica', description: 'Compostos de carbono, grupos funcionais e nomenclatura.', disciplina: 'Química', type: 'apresentacao', author: 'Prof. Daniel Chissano', date: '2026-03-20', size: '8.1 MB' },
  { id: 'CON-004', title: 'Análise de Os Lusíadas', description: 'Análise literária dos temas, personagens e recursos estilísticos.', disciplina: 'Português', type: 'documento', author: 'Prof.ª Lúcia Ribeiro', date: '2026-03-18', size: '1.2 MB' },
  { id: 'CON-005', title: 'Divisão Celular — Mitose e Meiose', description: 'Questionário interactivo sobre as fases da divisão celular.', disciplina: 'Biologia', type: 'questionario', author: 'Prof. Ernesto Vilankulo', date: '2026-03-15', size: '320 KB' },
  { id: 'CON-006', title: 'Introdução ao Mandarim — Tons', description: 'Material de apoio sobre os quatro tons do Mandarim com áudio.', disciplina: 'Mandarim', type: 'documento', author: 'Prof. Zhang Wei', date: '2026-03-12', size: '890 KB' },
  { id: 'CON-007', title: 'Segurança no Laboratório', description: 'Protocolo obrigatório de segurança para laboratórios de ciências.', disciplina: 'Química', type: 'link', author: 'Prof. Daniel Chissano', date: '2026-03-10' },
  { id: 'CON-008', title: 'Técnicas de Integração', description: 'Exercícios práticos de substituição, fracções parciais e integração por partes.', disciplina: 'Matemática', type: 'documento', author: 'Prof. António Magaia', date: '2026-04-01', size: '1.8 MB' },
  { id: 'CON-009', title: 'Hangul Básico — Alfabeto Coreano', description: 'Guia de aprendizagem do alfabeto coreano com exercícios de escrita.', disciplina: 'Coreano', type: 'documento', author: 'Prof. Kim Soo-jin', date: '2026-03-08', size: '650 KB' },
];

export const assessments: Assessment[] = [
  { id: 'AV-001', title: 'ACP — 2º Trimestre', disciplina: 'Matemática', turma: '11ª A', tipo: 'ACP', date: '2026-04-22', trimestre: 2, status: 'agendado', totalAlunos: 28, corrigidos: 0 },
  { id: 'AV-002', title: 'ACS2 — 2º Trimestre', disciplina: 'Química', turma: '11ª A', tipo: 'ACS2', date: '2026-04-25', trimestre: 2, status: 'agendado', totalAlunos: 28, corrigidos: 0 },
  { id: 'AV-003', title: 'ACP — 2º Trimestre', disciplina: 'Física', turma: '11ª A', tipo: 'ACP', date: '2026-04-20', trimestre: 2, status: 'publicado', totalAlunos: 28, corrigidos: 0 },
  { id: 'AV-004', title: 'ACS2 — 2º Trimestre', disciplina: 'Português', turma: '11ª A', tipo: 'ACS2', date: '2026-04-15', trimestre: 2, status: 'corrigido', totalAlunos: 28, corrigidos: 28 },
  { id: 'AV-005', title: 'ACS1 — 2º Trimestre', disciplina: 'Biologia', turma: '11ª A', tipo: 'ACS1', date: '2026-04-10', trimestre: 2, status: 'corrigido', totalAlunos: 28, corrigidos: 25 },
  { id: 'AV-006', title: 'ACS2 — 2º Trimestre', disciplina: 'Matemática', turma: '11ª B', tipo: 'ACS2', date: '2026-04-12', trimestre: 2, status: 'publicado', totalAlunos: 31, corrigidos: 12 },
  { id: 'AV-007', title: 'ACS1 — 2º Trimestre', disciplina: 'Mandarim', turma: '11ª A', tipo: 'ACS1', date: '2026-04-08', trimestre: 2, status: 'corrigido', totalAlunos: 28, corrigidos: 28 },
];

/* ─── Funções auxiliares ─── */
export function getStudentGrades(studentId: string) {
  return grades.filter(g => g.studentId === studentId);
}

export function getStudentAttendance(studentId: string) {
  return attendanceRecords.filter(a => a.studentId === studentId);
}

export function getStudentPayments(studentId: string) {
  return payments.filter(p => p.studentId === studentId);
}

export function getStudentObligations(studentId: string) {
  return obligations.filter(o => o.studentId === studentId);
}

export function getTodaySchedule(schedule: ScheduleSlot[]) {
  const days: ScheduleSlot['day'][] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
  const todayDay = days[new Date().getDay() - 1] || 'Segunda';
  return schedule.filter(s => s.day === todayDay);
}

export function getSubjectAverage(studentId: string, subjectId: string) {
  const subjectGrades = grades.filter(g => g.studentId === studentId && g.subjectId === subjectId);
  if (!subjectGrades.length) return 0;
  return Math.round(subjectGrades.reduce((sum, g) => sum + g.nota, 0) / subjectGrades.length * 10) / 10;
}

// MT = (ACS1 + ACS2 + ACP) / 3
export function calcMT(studentId: string, subjectId: string, trimestre: number) {
  const sg = grades.filter(g => g.studentId === studentId && g.subjectId === subjectId && g.trimestre === trimestre);
  const acs1 = sg.find(g => g.tipo === 'ACS1')?.nota;
  const acs2 = sg.find(g => g.tipo === 'ACS2')?.nota;
  const acp = sg.find(g => g.tipo === 'ACP')?.nota;
  const vals = [acs1, acs2, acp].filter((v): v is number => v !== undefined);
  if (vals.length === 0) return null;
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length * 10) / 10;
}

/* ─── Agregados financeiros ─── */
export const financeStats = {
  totalPendente: payments.filter(p => ['pendente', 'parcial'].includes(p.status)).reduce((s, p) => s + (p.amount - p.paidAmount), 0),
  totalValidado: payments.filter(p => p.status === 'validado').reduce((s, p) => s + p.paidAmount, 0),
  totalAtrasado: payments.filter(p => p.status === 'atrasado').reduce((s, p) => s + p.amount, 0),
  pagamentosHoje: 3,
  pendentesValidacao: payments.filter(p => p.status === 'em_revisao').length,
  alunosInadimplentes: new Set(payments.filter(p => p.status === 'atrasado').map(p => p.studentId)).size,
};

/* ─── Calendário de Avaliações ─── */
export interface AssessmentCalendarItem {
  id: string;
  subjectId: string;
  subjectName: string;
  turma: string;
  tipo: 'ACS1' | 'ACS2' | 'ACP' | 'Trabalho' | 'Exame';
  title: string;
  date: string;
  time: string;
  teacher: string;
  room: string;
  materia: string;
  status: 'futura' | 'hoje' | 'concluida' | 'adiada';
  studentIds: string[];
}

export const assessmentsCalendar: AssessmentCalendarItem[] = [
  { id: 'CAV-001', subjectId: 'DISC-001', subjectName: 'Matemática', turma: '11ª A', tipo: 'ACP', title: 'ACP — Cálculo Diferencial', date: '2026-04-22', time: '08:00', teacher: 'Prof. António Magaia', room: 'Sala 201', materia: 'Limites, derivadas e aplicações', status: 'futura', studentIds: ['ALU-001','ALU-002','ALU-008'] },
  { id: 'CAV-002', subjectId: 'DISC-003', subjectName: 'Química', turma: '11ª A', tipo: 'ACS2', title: 'ACS2 — Química Orgânica', date: '2026-04-25', time: '09:00', teacher: 'Prof. Daniel Chissano', room: 'Lab. 103', materia: 'Grupos funcionais e nomenclatura', status: 'futura', studentIds: ['ALU-001','ALU-002','ALU-008'] },
  { id: 'CAV-003', subjectId: 'DISC-002', subjectName: 'Física', turma: '11ª A', tipo: 'ACP', title: 'ACP — Leis de Newton', date: '2026-04-20', time: '10:00', teacher: 'Prof.ª Graça Machel', room: 'Lab. 102', materia: 'Dinâmica e aplicações', status: 'futura', studentIds: ['ALU-001','ALU-002','ALU-008'] },
  { id: 'CAV-004', subjectId: 'DISC-004', subjectName: 'Português', turma: '11ª A', tipo: 'ACS2', title: 'ACS2 — Os Lusíadas', date: '2026-04-15', time: '08:00', teacher: 'Prof.ª Lúcia Ribeiro', room: 'Sala 305', materia: 'Cantos I a V', status: 'concluida', studentIds: ['ALU-001'] },
  { id: 'CAV-005', subjectId: 'DISC-005', subjectName: 'Biologia', turma: '10ª A', tipo: 'Trabalho', title: 'Visita de Estudo — Relatório', date: '2026-04-18', time: '14:00', teacher: 'Prof. Ernesto Vilankulo', room: 'Externo', materia: 'Jardim Botânico Nacional', status: 'futura', studentIds: ['ALU-004'] },
  { id: 'CAV-006', subjectId: 'DISC-006', subjectName: 'Inglês', turma: '11ª A', tipo: 'ACS1', title: 'ACS1 — Reading Comprehension', date: '2026-04-28', time: '08:00', teacher: 'Prof.ª Lúcia Ribeiro', room: 'Sala 305', materia: 'Unit 4 — Modern Society', status: 'futura', studentIds: ['ALU-001'] },
  { id: 'CAV-007', subjectId: 'DISC-001', subjectName: 'Matemática', turma: '10ª A', tipo: 'ACS2', title: 'ACS2 — Funções', date: '2026-04-30', time: '08:00', teacher: 'Prof. António Magaia', room: 'Sala 202', materia: 'Funções quadráticas', status: 'futura', studentIds: ['ALU-004'] },
];

/* ─── Facturas ─── */
export interface Invoice {
  id: string;
  number: string;
  studentId: string;
  studentName: string;
  guardianName: string;
  items: { description: string; amount: number }[];
  subtotal: number;
  discount: number;
  penalty: number;
  total: number;
  issueDate: string;
  dueDate: string;
  turma: string;
  status: 'emitida' | 'paga' | 'vencida' | 'cancelada';
}

export const invoices: Invoice[] = [
  { id: 'FAC-001', number: 'FT 2026/0145', studentId: 'ALU-001', studentName: 'Amélia Mondlane', guardianName: 'Helena Mondlane', items: [{ description: 'Propina — 2º Trimestre', amount: 15000 }, { description: 'Material Escolar', amount: 2500 }], subtotal: 17500, discount: 0, penalty: 0, total: 17500, issueDate: '2026-04-01', dueDate: '2026-04-30', turma: '11ª A', status: 'emitida' },
  { id: 'FAC-002', number: 'FT 2026/0098', studentId: 'ALU-001', studentName: 'Amélia Mondlane', guardianName: 'Helena Mondlane', items: [{ description: 'Propina — 1º Trimestre', amount: 15000 }], subtotal: 15000, discount: 0, penalty: 0, total: 15000, issueDate: '2026-01-01', dueDate: '2026-01-15', turma: '11ª A', status: 'paga' },
  { id: 'FAC-003', number: 'FT 2026/0152', studentId: 'ALU-004', studentName: 'João Sitoe', guardianName: 'Maria Sitoe', items: [{ description: 'Propina — 1º Trimestre', amount: 15000 }], subtotal: 15000, discount: 0, penalty: 500, total: 15500, issueDate: '2025-12-01', dueDate: '2025-12-15', turma: '10ª A', status: 'vencida' },
  { id: 'FAC-004', number: 'FT 2026/0157', studentId: 'ALU-005', studentName: 'Marta Cossa', guardianName: '—', items: [{ description: 'Propina — 2º Trimestre', amount: 15000 }], subtotal: 15000, discount: 0, penalty: 300, total: 15300, issueDate: '2026-04-01', dueDate: '2026-04-15', turma: '11ª B', status: 'vencida' },
  { id: 'FAC-005', number: 'FT 2026/0162', studentId: 'ALU-007', studentName: 'Rosa Tembe', guardianName: '—', items: [{ description: 'Propina — 2º Trimestre', amount: 15000 }], subtotal: 15000, discount: 0, penalty: 0, total: 15000, issueDate: '2026-04-01', dueDate: '2026-04-01', turma: '12ª B', status: 'paga' },
];

/* ─── Devedores ─── */
export interface Debtor {
  studentId: string;
  studentName: string;
  guardianName: string;
  guardianPhone: string;
  turma: string;
  totalDebt: number;
  monthsLate: number;
  lastPayment?: string;
  status: 'critico' | 'atraso' | 'recente';
}

export const debtors: Debtor[] = [
  { studentId: 'ALU-004', studentName: 'João Sitoe', guardianName: 'Maria Sitoe', guardianPhone: '+258 84 345 6789', turma: '10ª A', totalDebt: 15500, monthsLate: 4, lastPayment: '2025-09-10', status: 'critico' },
  { studentId: 'ALU-005', studentName: 'Marta Cossa', guardianName: 'Eduardo Cossa', guardianPhone: '+258 84 456 7891', turma: '11ª B', totalDebt: 15300, monthsLate: 1, lastPayment: '2026-01-05', status: 'atraso' },
  { studentId: 'ALU-001', studentName: 'Amélia Mondlane', guardianName: 'Helena Mondlane', guardianPhone: '+258 84 123 4567', turma: '11ª A', totalDebt: 500, monthsLate: 1, lastPayment: '2026-01-10', status: 'recente' },
];

/* ─── Aprovações ─── */
export interface Approval {
  id: string;
  category: 'nota' | 'conteudo' | 'avaliacao' | 'horario' | 'academico' | 'calendario' | 'disciplina' | 'financeiro';
  scope: 'pedagogia' | 'direccao';
  title: string;
  origin: string;
  turma?: string;
  disciplina?: string;
  submittedAt: string;
  priority: 'alta' | 'media' | 'baixa';
  status: 'pendente' | 'aprovado' | 'rejeitado';
  impact?: string;
  details: string;
  recommendation?: string;
}

export const approvals: Approval[] = [
  { id: 'APV-001', category: 'nota', scope: 'pedagogia', title: 'Lançamento ACS1 — Matemática 11ª A', origin: 'Prof. António Magaia', turma: '11ª A', disciplina: 'Matemática', submittedAt: '2026-04-11', priority: 'alta', status: 'pendente', details: 'Lançamento de 28 notas da ACS1, média da turma 13.2/20.' },
  { id: 'APV-002', category: 'conteudo', scope: 'pedagogia', title: 'Material — Técnicas de Integração', origin: 'Prof. António Magaia', disciplina: 'Matemática', submittedAt: '2026-04-10', priority: 'media', status: 'pendente', details: 'Documento PDF 1.8 MB com exercícios de preparação.' },
  { id: 'APV-003', category: 'avaliacao', scope: 'pedagogia', title: 'Nova Avaliação — ACP Física 11ª B', origin: 'Prof.ª Graça Machel', turma: '11ª B', disciplina: 'Física', submittedAt: '2026-04-09', priority: 'alta', status: 'pendente', details: 'Avaliação ACP marcada para 24/04 às 09h00.' },
  { id: 'APV-004', category: 'horario', scope: 'pedagogia', title: 'Alteração de horário — 12ª A', origin: 'Secretaria', turma: '12ª A', submittedAt: '2026-04-08', priority: 'media', status: 'pendente', details: 'Transferência de Matemática para Sala 108 nas próximas 2 semanas.' },
  { id: 'APV-005', category: 'calendario', scope: 'direccao', title: 'Alteração do Calendário Académico — Maio', origin: 'Pedagogia', submittedAt: '2026-04-09', priority: 'alta', status: 'pendente', impact: 'Institucional', details: 'Antecipação do início do 3º Trimestre em uma semana.', recommendation: 'Aprovar com comunicação prévia aos encarregados.' },
  { id: 'APV-006', category: 'academico', scope: 'direccao', title: 'Acesso especial — Aluno em recuperação', origin: 'Pedagogia', submittedAt: '2026-04-08', priority: 'media', status: 'pendente', impact: 'Académico', details: 'Pedido de prova de recuperação fora do calendário oficial para 2 alunos.', recommendation: 'Aprovar com supervisão pedagógica.' },
  { id: 'APV-007', category: 'financeiro', scope: 'direccao', title: 'Isenção parcial de propina', origin: 'Finanças', submittedAt: '2026-04-07', priority: 'alta', status: 'pendente', impact: 'Financeiro', details: 'Pedido de redução de 30% na propina para aluno em dificuldade comprovada.', recommendation: 'Avaliar caso social.' },
];

/* ─── Admissões detalhadas ─── */
export interface Admission {
  id: string;
  candidateName: string;
  birthDate: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  desiredClass: string;
  previousSchool: string;
  documents: { name: string; received: boolean }[];
  submittedAt: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  notes?: string;
}

export const admissions: Admission[] = [
  { id: 'ADM-001', candidateName: 'Ana Manhiça', birthDate: '2010-03-12', guardianName: 'Joaquim Manhiça', guardianPhone: '+258 84 110 2233', guardianEmail: 'j.manhica@email.mz', desiredClass: '10ª A', previousSchool: 'Escola Secundária da Polana', documents: [{ name: 'BI / Cédula', received: true }, { name: 'Certificado 9ª', received: true }, { name: 'Ficha Médica', received: false }], submittedAt: '2026-04-10', status: 'pendente' },
  { id: 'ADM-002', candidateName: 'Bruno Nhanala', birthDate: '2009-08-22', guardianName: 'Rita Nhanala', guardianPhone: '+258 84 220 3344', guardianEmail: 'r.nhanala@email.mz', desiredClass: '11ª', previousSchool: 'Escola Josina Machel', documents: [{ name: 'BI / Cédula', received: true }, { name: 'Certificado 10ª', received: true }, { name: 'Ficha Médica', received: true }], submittedAt: '2026-04-09', status: 'aprovado' },
  { id: 'ADM-003', candidateName: 'Célia Dzimba', birthDate: '2010-11-05', guardianName: 'Sérgio Dzimba', guardianPhone: '+258 84 330 4455', guardianEmail: 's.dzimba@email.mz', desiredClass: '10ª B', previousSchool: 'Externato Belo Mundo', documents: [{ name: 'BI / Cédula', received: true }, { name: 'Certificado 9ª', received: false }, { name: 'Ficha Médica', received: true }], submittedAt: '2026-04-08', status: 'pendente' },
  { id: 'ADM-004', candidateName: 'David Cumbane', birthDate: '2010-06-18', guardianName: 'Hortência Cumbane', guardianPhone: '+258 84 440 5566', guardianEmail: 'h.cumbane@email.mz', desiredClass: '10ª A', previousSchool: 'Escola Primária Completa de Matola', documents: [{ name: 'BI / Cédula', received: true }, { name: 'Certificado 9ª', received: true }], submittedAt: '2026-04-07', status: 'rejeitado', notes: 'Vagas esgotadas para a turma pretendida.' },
  { id: 'ADM-005', candidateName: 'Elisa Mabjaia', birthDate: '2008-02-14', guardianName: 'Paulo Mabjaia', guardianPhone: '+258 84 550 6677', guardianEmail: 'p.mabjaia@email.mz', desiredClass: '12ª A', previousSchool: 'Colégio Mateus Sansão Muthemba', documents: [{ name: 'BI', received: true }, { name: 'Certificado 11ª', received: true }, { name: 'Ficha Médica', received: true }], submittedAt: '2026-04-05', status: 'aprovado' },
];

/* ─── Materiais por disciplina (auxiliar) ─── */
export function getSubjectAssessments(subjectId: string) {
  return assessmentsCalendar.filter(a => a.subjectId === subjectId);
}

export function getSubjectKnowledge(subjectName: string) {
  return knowledgeItems.filter(k => k.disciplina === subjectName);
}
