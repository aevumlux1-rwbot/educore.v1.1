import { Route, Routes, Navigate } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { RoleLayout } from '@/components/layout/RoleLayout';
import { AuthGuard } from '@/app/guards/AuthGuard';
import { RoleGuard } from '@/app/guards/RoleGuard';
import NotFound from '@/pages/NotFound';

// Public
import LandingPage from '@/pages/public/LandingPage';
import { FeaturesPage, ContactPage, ApplyPage, ApplyStatusPage } from '@/pages/public/PublicPages';
import LoginPage from '@/pages/auth/LoginPage';
import { ForgotPasswordPage, ResetPasswordPage } from '@/pages/auth/PasswordPages';
import { AppRedirect } from '@/app/router/AppRedirect';

// Shared
import SettingsPage from '@/pages/app/SettingsPage';

// Student
import { StudentDashboard, StudentGrades, StudentAttendance, StudentSchedule, StudentAgenda, StudentKnowledge, StudentFeed, StudentChat, StudentNotifications, StudentFinance } from '@/pages/role/StudentPages';
import { StudentSubjects, StudentSubjectDetail, StudentAssessmentsCalendar } from '@/pages/role/StudentExtraPages';

// Guardian
import { GuardianDashboard, GuardianStudents, GuardianPerformance, GuardianAttendance, GuardianSchedule, GuardianFinance, GuardianPayments, GuardianDocuments, GuardianChat, GuardianNotifications } from '@/pages/role/GuardianPages';
import { GuardianStudentDetail, GuardianAssessmentsCalendar } from '@/pages/role/GuardianExtraPages';

// Teacher
import { TeacherDashboard, TeacherSchedule, TeacherClasses, TeacherAttendance, TeacherAssessments, TeacherGradebook, TeacherKnowledge, TeacherChat, TeacherNotifications } from '@/pages/role/TeacherPages';
import { TeacherClassDetail } from '@/pages/role/TeacherExtraPages';

// Pedagogy
import { PedagogyDashboard, PedagogyAnalytics, PedagogyClasses, PedagogyTeachers, PedagogyAttendance, PedagogySchedule, PedagogyRisk, PedagogyReports } from '@/pages/role/PedagogyPages';
import { PedagogyApprovals, PedagogyAssessmentsCalendar, PedagogyNotifications } from '@/pages/role/PedagogyExtraPages';

// Executive
import { ExecutiveDashboard, ExecutiveFinance, ExecutiveAcademic, ExecutiveEnrollment, ExecutiveReports, ExecutiveAudit } from '@/pages/role/ExecutivePages';
import { ExecutiveApprovals, ExecutiveNotifications } from '@/pages/role/ExecutiveExtraPages';

// Secretary
import { SecretaryDashboard, SecretaryAdmissions, SecretaryEnrollments, SecretaryStudents, SecretaryDocuments, SecretaryClasses, SecretarySchedule, SecretaryRegularity } from '@/pages/role/SecretaryPages';
import { SecretaryAdmissionDetail, SecretaryStudentDetail, SecretaryDocumentBuilder, SecretaryNotifications } from '@/pages/role/SecretaryExtraPages';

// Finance
import { FinanceDashboard, FinancePayments, FinanceValidation, FinanceObligations, FinanceAccounts, FinanceReceipts, FinancePenalties, FinanceTreasury, FinanceReports } from '@/pages/role/FinancePages';
import { FinancePaymentDetail, FinanceInvoices, FinanceInvoiceDetail, FinanceDebtors, FinanceNotifications } from '@/pages/role/FinanceExtraPages';

export function AppRouter() {
  return (
    <Routes>
      {/* ─── Public ─── */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/apply/status" element={<ApplyStatusPage />} />
      </Route>

      {/* ─── Auth ─── */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* ─── Authenticated ─── */}
      <Route element={<AuthGuard />}>
        <Route path="/app" element={<RoleLayout />}>
          <Route index element={<AppRedirect />} />
          {/* Shared */}
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<SettingsPage />} />

          {/* ─── Student zone ─── */}
          <Route element={<RoleGuard allowed={['student']} />}>
            <Route path="student/dashboard" element={<StudentDashboard />} />
            <Route path="student/grades" element={<StudentGrades />} />
            <Route path="student/attendance" element={<StudentAttendance />} />
            <Route path="student/schedule" element={<StudentSchedule />} />
            <Route path="student/agenda" element={<StudentAgenda />} />
            <Route path="student/knowledge" element={<StudentKnowledge />} />
            <Route path="student/finance" element={<StudentFinance />} />
            <Route path="student/feed" element={<StudentFeed />} />
            <Route path="student/chat" element={<StudentChat />} />
            <Route path="student/notifications" element={<StudentNotifications />} />
            <Route path="student/subjects" element={<StudentSubjects />} />
            <Route path="student/subjects/:subjectId" element={<StudentSubjectDetail />} />
            <Route path="student/assessments-calendar" element={<StudentAssessmentsCalendar />} />
          </Route>

          {/* ─── Guardian zone ─── */}
          <Route element={<RoleGuard allowed={['guardian']} />}>
            <Route path="guardian/dashboard" element={<GuardianDashboard />} />
            <Route path="guardian/students" element={<GuardianStudents />} />
            <Route path="guardian/students/:studentId" element={<GuardianStudentDetail />} />
            <Route path="guardian/performance" element={<GuardianPerformance />} />
            <Route path="guardian/attendance" element={<GuardianAttendance />} />
            <Route path="guardian/schedule" element={<GuardianSchedule />} />
            <Route path="guardian/finance" element={<GuardianFinance />} />
            <Route path="guardian/payments" element={<GuardianPayments />} />
            <Route path="guardian/documents" element={<GuardianDocuments />} />
            <Route path="guardian/chat" element={<GuardianChat />} />
            <Route path="guardian/notifications" element={<GuardianNotifications />} />
            <Route path="guardian/assessments-calendar" element={<GuardianAssessmentsCalendar />} />
          </Route>

          {/* ─── Teacher zone ─── */}
          <Route element={<RoleGuard allowed={['teacher']} />}>
            <Route path="teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="teacher/schedule" element={<TeacherSchedule />} />
            <Route path="teacher/classes" element={<TeacherClasses />} />
            <Route path="teacher/classes/:classId" element={<TeacherClassDetail />} />
            <Route path="teacher/attendance" element={<TeacherAttendance />} />
            <Route path="teacher/assessments" element={<TeacherAssessments />} />
            <Route path="teacher/gradebook" element={<TeacherGradebook />} />
            <Route path="teacher/knowledge" element={<TeacherKnowledge />} />
            <Route path="teacher/chat" element={<TeacherChat />} />
            <Route path="teacher/notifications" element={<TeacherNotifications />} />
          </Route>

          {/* ─── Pedagogy zone ─── */}
          <Route element={<RoleGuard allowed={['pedagogy']} />}>
            <Route path="pedagogy/dashboard" element={<PedagogyDashboard />} />
            <Route path="pedagogy/analytics" element={<PedagogyAnalytics />} />
            <Route path="pedagogy/classes" element={<PedagogyClasses />} />
            <Route path="pedagogy/teachers" element={<PedagogyTeachers />} />
            <Route path="pedagogy/attendance" element={<PedagogyAttendance />} />
            <Route path="pedagogy/schedule" element={<PedagogySchedule />} />
            <Route path="pedagogy/risk" element={<PedagogyRisk />} />
            <Route path="pedagogy/reports" element={<PedagogyReports />} />
            <Route path="pedagogy/approvals" element={<PedagogyApprovals />} />
            <Route path="pedagogy/assessments-calendar" element={<PedagogyAssessmentsCalendar />} />
            <Route path="pedagogy/notifications" element={<PedagogyNotifications />} />
          </Route>

          {/* ─── Executive zone ─── */}
          <Route element={<RoleGuard allowed={['executive']} />}>
            <Route path="executive/dashboard" element={<ExecutiveDashboard />} />
            <Route path="executive/finance" element={<ExecutiveFinance />} />
            <Route path="executive/academic" element={<ExecutiveAcademic />} />
            <Route path="executive/enrollment" element={<ExecutiveEnrollment />} />
            <Route path="executive/reports" element={<ExecutiveReports />} />
            <Route path="executive/audit" element={<ExecutiveAudit />} />
            <Route path="executive/approvals" element={<ExecutiveApprovals />} />
            <Route path="executive/notifications" element={<ExecutiveNotifications />} />
          </Route>

          {/* ─── Secretary zone ─── */}
          <Route element={<RoleGuard allowed={['secretary']} />}>
            <Route path="secretary/dashboard" element={<SecretaryDashboard />} />
            <Route path="secretary/admissions" element={<SecretaryAdmissions />} />
            <Route path="secretary/admissions/:id" element={<SecretaryAdmissionDetail />} />
            <Route path="secretary/enrollments" element={<SecretaryEnrollments />} />
            <Route path="secretary/students" element={<SecretaryStudents />} />
            <Route path="secretary/students/:studentId" element={<SecretaryStudentDetail />} />
            <Route path="secretary/documents" element={<SecretaryDocuments />} />
            <Route path="secretary/documents/new" element={<SecretaryDocumentBuilder />} />
            <Route path="secretary/classes" element={<SecretaryClasses />} />
            <Route path="secretary/schedule" element={<SecretarySchedule />} />
            <Route path="secretary/regularity" element={<SecretaryRegularity />} />
            <Route path="secretary/notifications" element={<SecretaryNotifications />} />
          </Route>

          {/* ─── Finance zone (ISOLATED) ─── */}
          <Route element={<RoleGuard allowed={['finance']} />}>
            <Route path="finance/dashboard" element={<FinanceDashboard />} />
            <Route path="finance/payments" element={<FinancePayments />} />
            <Route path="finance/payments/:paymentId" element={<FinancePaymentDetail />} />
            <Route path="finance/validation" element={<FinanceValidation />} />
            <Route path="finance/obligations" element={<FinanceObligations />} />
            <Route path="finance/accounts" element={<FinanceAccounts />} />
            <Route path="finance/receipts" element={<FinanceReceipts />} />
            <Route path="finance/penalties" element={<FinancePenalties />} />
            <Route path="finance/treasury" element={<FinanceTreasury />} />
            <Route path="finance/reports" element={<FinanceReports />} />
            <Route path="finance/invoices" element={<FinanceInvoices />} />
            <Route path="finance/invoices/:invoiceId" element={<FinanceInvoiceDetail />} />
            <Route path="finance/debtors" element={<FinanceDebtors />} />
            <Route path="finance/notifications" element={<FinanceNotifications />} />
          </Route>
        </Route>
      </Route>

      {/* ─── Catch-all ─── */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
