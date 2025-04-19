import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { RecipeDetailModal } from "./components/RecipeDetailModal";
import { RecipeProvider } from "./context/RecipeContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecipeProvider>
        <Router />
        <RecipeDetailModal />
        <Toaster />
      </RecipeProvider>
    </QueryClientProvider>
  );
}

export default App;
