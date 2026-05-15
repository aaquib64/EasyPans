import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import Index from "./pages/Index";
import OAuthSuccess from "./pages/OAuthSuccess";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import Login from "./pages/Login";
import AIChefPage from "./features/AI/AIChefPage";
import VirtualChefPage from "./features/VirtualChef/VirtualChefPage";
import VerifyOtp from "./pages/verifyOtp";
import NotFound from "./pages/NotFound";
import InventoryPage from "./pages/inventry/InventoryPage";

// Admin Pages
import AdminHome from "./pages/admin/AdminHome";
import AdminRecipes from "./pages/admin/AdminRecipes";
import RecipeForm from "./pages/admin/RecipeForm";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminRecipeDetail from "./pages/admin/AdminRecipeDetail"; 

import Survey from "./pages/Survey";
import SurveyModal from "./components/SurveyModal";

// Auth Components
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <SurveyModal />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/oauth-success" element={<OAuthSuccess />} />
             <Route element={<ProtectedRoute />}>
               <Route path="/recipes" element={<Recipes />} />
            </Route>
           
            <Route path="/login" element={<Login />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />

            {/* Admin Inventory */}
            <Route path="/admin/inventory" element={<InventoryPage />} />

            {/* AI Routes */}
            {/* <Route path="/ai-chef" element={<AIChefPage />} />
            <Route path="/virtual-chef" element={<VirtualChefPage />} /> */}

            {/* Protected User */}
            <Route element={<ProtectedRoute />}>
              <Route path="/recipe/:id" element={<RecipeDetail />} />
            </Route>

            {/* Admin */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminHome />} />
              <Route path="/admin/recipes" element={<AdminRecipes />} />
              <Route path="/admin/recipes/new" element={<RecipeForm />} />
              <Route path="/admin/recipes/edit/:id" element={<RecipeForm />} />
              <Route path="/admin/recipes/:id" element={<AdminRecipeDetail />} />
              <Route path="/admin/users" element={<AdminUsers />} />
            </Route>

            {/* Survey */}
            <Route path="/survey" element={<Survey />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
