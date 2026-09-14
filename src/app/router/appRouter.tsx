import { Navigate, Route, Routes } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { RoleLayout } from '@/components/layout/RoleLayout';
import { AuthGuard } from '@/app/guards/AuthGuard';
import { RoleGuard } from '@/app/guards/RoleGuard';
import { AppRedirect } from '@/app/router/AppRedirect';
import LandingPage from '@/pages/public/LandingPage';
import LoginPage from '@/pages/auth/LoginPage';
import SettingsPage from '@/pages/app/SettingsPage';
import NotFound from '@/pages/NotFound';

// Legacy shared pages remain reachable to preserve the existing product routes.
import AcademicPage from '@/pages/app/AcademicPage';
import FinancePage from '@/pages/app/FinancePage';
import KnowledgePage from '@/pages/app/KnowledgePage';
import ChatPage from '@/pages/app/ChatPage';
import FeedPage from '@/pages/app/FeedPage';
import NotificationsPage from '@/pages/app/NotificationsPage';

import {
  StudentDashboard,
  StudentSubjects,
  StudentGrades,
  StudentAttendance,
  StudentSchedule,
  StudentFinance,
  StudentChat,
  StudentNotifications,
  GuardianDashboard,
  GuardianStudents,
  GuardianPerformance,
  GuardianAttendance,
  GuardianPayments,
  GuardianChat,
  GuardianNotifications,
  TeacherDashboard,
  TeacherSchedule,
  TeacherClasses,
  TeacherAttendance,
  TeacherGradebook,
  TeacherContent,
  TeacherChat,
  TeacherNotifications,
  PedagogyDashboard,
  PedagogyApprovals,
  PedagogyAnalytics,
  PedagogyClasses,
  PedagogyTeachers,
  PedagogyRisk,
  PedagogyReports,
  PedagogyNotifications,
  ExecutiveDashboard,
  ExecutiveApprovals,
  ExecutiveFinance,
  ExecutiveAcademic,
  ExecutiveEnrollment,
  ExecutiveReports,
  ExecutiveAudit,
  ExecutiveNotifications,
  SecretaryDashboard,
  SecretaryAdmissions,
  SecretaryEnrollments,
  SecretaryStudents,
  SecretaryDocuments,
  SecretaryClasses,
  SecretaryNotifications,
  FinanceDashboard,
  FinancePayments,
  FinanceValidation,
  FinanceInvoices,
  FinanceDebtors,
  FinanceReceipts,
  FinanceTreasury,
  FinanceReports,
  FinanceNotifications,
} from '@/pages/role/PresentationRolePages';

export function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<LandingPage />} />
        <Route path="/contact" element={<LandingPage />} />
        <Route path="/apply" element={<LandingPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<LoginPage />} />
      <Route path="/reset-password" element={<LoginPage />} />

      <Route element={<AuthGuard />}>
        <Route path="/app" element={<RoleLayout />}>
          <Route index element={<AppRedirect />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<SettingsPage />} />

          <Route element={<RoleGuard allowed={['student']} />}>
            <Route path="student/dashboard" element={<StudentDashboard />} />
            <Route path="student/subjects" element={<StudentSubjects />} />
            <Route path="student/grades" element={<StudentGrades />} />
            <Route path="student/attendance" element={<StudentAttendance />} />
            <Route path="student/schedule" element={<StudentSchedule />} />
            <Route path="student/finance" element={<StudentFinance />} />
            <Route path="student/chat" element={<StudentChat />} />
            <Route path="student/notifications" element={<StudentNotifications />} />
          </Route>

          <Route element={<RoleGuard allowed={['guardian']} />}>
            <Route path="guardian/dashboard" element={<GuardianDashboard />} />
            <Route path="guardian/students" element={<GuardianStudents />} />
            <Route path="guardian/performance" element={<GuardianPerformance />} />
            <Route path="guardian/attendance" element={<GuardianAttendance />} />
            <Route path="guardian/payments" element={<GuardianPayments />} />
            <Route path="guardian/chat" element={<GuardianChat />} />
            <Route path="guardian/notifications" element={<GuardianNotifications />} />
          </Route>

          <Route element={<RoleGuard allowed={['teacher']} />}>
            <Route path="teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="teacher/schedule" element={<TeacherSchedule />} />
            <Route path="teacher/classes" element={<TeacherClasses />} />
            <Route path="teacher/attendance" element={<TeacherAttendance />} />
            <Route path="teacher/gradebook" element={<TeacherGradebook />} />
            <Route path="teacher/content" element={<TeacherContent />} />
            <Route path="teacher/chat" element={<TeacherChat />} />
            <Route path="teacher/notifications" element={<TeacherNotifications />} />
          </Route>

          <Route element={<RoleGuard allowed={['pedagogy']} />}>
            <Route path="pedagogy/dashboard" element={<PedagogyDashboard />} />
            <Route path="pedagogy/approvals" element={<PedagogyApprovals />} />
            <Route path="pedagogy/analytics" element={<PedagogyAnalytics />} />
            <Route path="pedagogy/classes" element={<PedagogyClasses />} />
            <Route path="pedagogy/teachers" element={<PedagogyTeachers />} />
            <Route path="pedagogy/risk" element={<PedagogyRisk />} />
            <Route path="pedagogy/reports" element={<PedagogyReports />} />
            <Route path="pedagogy/notifications" element={<PedagogyNotifications />} />
          </Route>

          <Route element={<RoleGuard allowed={['executive']} />}>
            <Route path="executive/dashboard" element={<ExecutiveDashboard />} />
            <Route path="executive/approvals" element={<ExecutiveApprovals />} />
            <Route path="executive/finance" element={<ExecutiveFinance />} />
            <Route path="executive/academic" element={<ExecutiveAcademic />} />
            <Route path="executive/enrollment" element={<ExecutiveEnrollment />} />
            <Route path="executive/reports" element={<ExecutiveReports />} />
            <Route path="executive/audit" element={<ExecutiveAudit />} />
            <Route path="executive/notifications" element={<ExecutiveNotifications />} />
          </Route>

          <Route element={<RoleGuard allowed={['secretary']} />}>
            <Route path="secretary/dashboard" element={<SecretaryDashboard />} />
            <Route path="secretary/admissions" element={<SecretaryAdmissions />} />
            <Route path="secretary/enrollments" element={<SecretaryEnrollments />} />
            <Route path="secretary/students" element={<SecretaryStudents />} />
            <Route path="secretary/documents" element={<SecretaryDocuments />} />
            <Route path="secretary/classes" element={<SecretaryClasses />} />
            <Route path="secretary/notifications" element={<SecretaryNotifications />} />
          </Route>

          <Route element={<RoleGuard allowed={['finance']} />}>
            <Route path="finance/dashboard" element={<FinanceDashboard />} />
            <Route path="finance/payments" element={<FinancePayments />} />
            <Route path="finance/validation" element={<FinanceValidation />} />
            <Route path="finance/invoices" element={<FinanceInvoices />} />
            <Route path="finance/debtors" element={<FinanceDebtors />} />
            <Route path="finance/receipts" element={<FinanceReceipts />} />
            <Route path="finance/treasury" element={<FinanceTreasury />} />
            <Route path="finance/reports" element={<FinanceReports />} />
            <Route path="finance/notifications" element={<FinanceNotifications />} />
          </Route>

          <Route path="academic/*" element={<AcademicPage />} />
          <Route path="finance-legacy/*" element={<FinancePage />} />
          <Route path="knowledge/*" element={<KnowledgePage />} />
          <Route path="chat/*" element={<ChatPage />} />
          <Route path="feed" element={<FeedPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="admin/*" element={<Navigate to="/app/finance/dashboard" replace />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
