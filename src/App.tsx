
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import SplashScreen from "@/components/SplashScreen";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Library from "./pages/Library";
import BookDetail from "./pages/BookDetail";
import ItemDetail from "./pages/ItemDetail";
import Capture from "./pages/Capture";
import Processing from "./pages/Processing";
import Settings from "./pages/Settings";
import BooksManager from "./pages/BooksManager";
import Billing from "./pages/Billing";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Search from "./pages/Search";
import Duplicates from "./pages/Duplicates";
import RecentImports from "./pages/RecentImports";
import TagsManager from "./pages/TagsManager";
import Import from "./pages/Import";
import Export from "./pages/Export";
import CloudSync from "./pages/CloudSync";
import Notifications from "./pages/Notifications";
import ConsentHistory from "./pages/ConsentHistory";
import Analytics from "./pages/Analytics";
import APIKeys from "./pages/APIKeys";
import Webhooks from "./pages/Webhooks";
import Templates from "./pages/Templates";
import AuditLog from "./pages/AuditLog";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import Changelog from "./pages/Changelog";


const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(false);


  if (showSplash) {
    return (
      <SplashScreen 
        onComplete={() => setShowSplash(false)}
      />
    );
  }

  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
                <Route path="/books/:id" element={<ProtectedRoute><BookDetail /></ProtectedRoute>} />
                <Route path="/items/:id" element={<ProtectedRoute><ItemDetail /></ProtectedRoute>} />
                <Route path="/capture" element={<ProtectedRoute><Capture /></ProtectedRoute>} />
                <Route path="/processing" element={<ProtectedRoute><Processing /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/books" element={<ProtectedRoute><BooksManager /></ProtectedRoute>} />
                <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
                <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/duplicates" element={<ProtectedRoute><Duplicates /></ProtectedRoute>} />
                <Route path="/recent-imports" element={<ProtectedRoute><RecentImports /></ProtectedRoute>} />
                <Route path="/tags" element={<ProtectedRoute><TagsManager /></ProtectedRoute>} />
                <Route path="/import" element={<ProtectedRoute><Import /></ProtectedRoute>} />
                <Route path="/export" element={<ProtectedRoute><Export /></ProtectedRoute>} />
                <Route path="/cloud-sync" element={<ProtectedRoute><CloudSync /></ProtectedRoute>} />
                <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
                <Route path="/consent-history" element={<ProtectedRoute><ConsentHistory /></ProtectedRoute>} />
                <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                <Route path="/api-keys" element={<ProtectedRoute><APIKeys /></ProtectedRoute>} />
                <Route path="/webhooks" element={<ProtectedRoute><Webhooks /></ProtectedRoute>} />
                <Route path="/templates" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
                <Route path="/audit-log" element={<ProtectedRoute><AuditLog /></ProtectedRoute>} />
                <Route path="/help" element={<Help />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/changelog" element={<Changelog />} />
                <Route path="/terms" element={<Terms />} />

              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};


export default App;


