import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import LoginLocal from "./pages/LoginLocal";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import NafathAuth from "./pages/NafathAuth";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import TechnicalEvaluationIndicators from "./pages/TechnicalEvaluationIndicators";
import TrainingStage from "./pages/TrainingStage";
import CourseDetail from "./pages/CourseDetail";
import IndividualCourseDetail from "./pages/IndividualCourseDetail";
import ContactUs from "./pages/ContactUs";
import IndividualsJourney from "./pages/IndividualsJourney";
import UnderReview from "./pages/UnderReview";
import Certificate from "./pages/Certificate";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAssociations from "./pages/AdminAssociations";
import AdminAssociationDetail from "./pages/AdminAssociationDetail";
import AdminReviewers from "./pages/AdminReviewers";
import AdminReviewerDetail from "./pages/AdminReviewerDetail";
import AdminReports from "./pages/AdminReports";
import AdminUsers from "./pages/AdminUsers";
import AdminRoles from "./pages/AdminRoles";
import EvaluatorDashboard from "./pages/EvaluatorDashboard";
import EvaluatorAssignments from "./pages/EvaluatorAssignments";
import EvaluationDetails from "./pages/EvaluationDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login-local" element={<LoginLocal />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/nafath-auth" element={<NafathAuth />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/technical-indicators/:courseSlug"
              element={
                <ProtectedRoute>
                  <TechnicalEvaluationIndicators />
                </ProtectedRoute>
              }
              />
            <Route
              path="/training-stage"
              element={
                <ProtectedRoute>
                  <TrainingStage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/course/:courseId"
              element={
                <ProtectedRoute>
                  <CourseDetail />
                </ProtectedRoute>
              }
            />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/individuals-journey" element={<IndividualsJourney />} />
            <Route path="/individual-course/:courseId" element={<IndividualCourseDetail />} />
            <Route
              path="/under-review"
              element={
                <ProtectedRoute>
                  <UnderReview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/certificate/:organizationId"
              element={
                <ProtectedRoute>
                  <Certificate />
                </ProtectedRoute>
              }
            />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/roles" element={<AdminRoles />} />
            <Route path="/admin/associations" element={<AdminAssociations />} />
            <Route path="/admin/associations/:id" element={<AdminAssociationDetail />} />
            <Route path="/admin/reviewers" element={<AdminReviewers />} />
            <Route path="/admin/reviewers/:id" element={<AdminReviewerDetail />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route
              path="/evaluator"
              element={
                <ProtectedRoute>
                  <EvaluatorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evaluator/assignments"
              element={
                <ProtectedRoute>
                  <EvaluatorAssignments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evaluator/assignment/:assignmentId"
              element={
                <ProtectedRoute>
                  <EvaluationDetails />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
