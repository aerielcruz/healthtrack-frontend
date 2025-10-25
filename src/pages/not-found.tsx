import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useLocation } from "wouter";

export function NotFound() {
  const [location, navigate] = useLocation();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
            <h1 className="text-3xl font-bold text-gray-900">404</h1>
            <p className="text-gray-600 text-lg">
              Oops! The page you’re looking for doesn’t exist.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={handleBack}
              data-testid="button-back-home"
            >
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
