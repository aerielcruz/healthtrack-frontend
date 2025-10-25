import { useState } from "react";
import { Activity, Apple, BarChart3, Calendar, CheckCircle, Edit3, Heart, Menu, Smartphone, Target, TrendingUp, Users, X, Zap } from "lucide-react";
import { SiApple, SiGoogleplay } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import heroImage from "@assets/generated_images/Fitness_tracking_hero_image_630b98c5.png";
import testimonial1 from "@assets/stock_images/professional_headsho_fc9e0be2.jpg";
import testimonial2 from "@assets/stock_images/professional_headsho_89e36612.jpg";
import testimonial3 from "@assets/stock_images/professional_headsho_84e78b99.jpg";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLocation } from "wouter";

export function Home() {
  const [location, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  const handleLogin = () => {
    navigate('/login')
  }

  const handleSignup = () => {
    navigate('/signup')
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b backdrop-blur-lg bg-background/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer">
              <Activity className="h-8 w-8 text-primary" data-testid="icon-logo" />
              <span className="text-xl font-bold" data-testid="text-brand">HealthTrack</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('features')}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-features"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-about"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-testimonials"
              >
                Testimonials
              </button>
            </div>

            <div className="flex items-center gap-4">
              {/* <ThemeToggle /> */}
              <Button variant="outline" size="sm" className="hidden sm:inline-flex" data-testid="button-login" onClick={handleLogin}>
                Log In
              </Button>
              <Button size="sm" className="hidden sm:inline-flex" data-testid="button-signup" onClick={handleSignup}>
                Sign Up
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(true)}
                data-testid="button-mobile-menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="right" data-testid="menu-mobile">
          <SheetHeader>
            <SheetTitle>
              <div className="flex items-center gap-2">
                <Activity className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">HealthTrack</span>
              </div>
            </SheetTitle>
          </SheetHeader>
          <div className="mt-8 flex flex-col gap-2">
            <button
              onClick={() => scrollToSection('features')}
              className="block w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover-elevate rounded-lg transition-colors"
              data-testid="link-mobile-features"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover-elevate rounded-lg transition-colors"
              data-testid="link-mobile-about"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="block w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover-elevate rounded-lg transition-colors"
              data-testid="link-mobile-testimonials"
            >
              Testimonials
            </button>
            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full" onClick={() => {
                setMobileMenuOpen(false)
                handleLogin()
              }} data-testid="button-mobile-login">
                Log In
              </Button>
              <Button className="w-full" onClick={() => {
                setMobileMenuOpen(false)
                handleSignup()
              }} data-testid="button-mobile-signup" >
                Sign Up
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden" data-testid="section-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left Column - Content (60%) */}
            <div className="lg:col-span-3 space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight" data-testid="text-hero-title">
                  Transform Your{" "}
                  <span className="text-primary">Fitness Journey</span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl" data-testid="text-hero-subtitle">
                  Track workouts, meals, and daily activities with precision. Set goals, monitor progress, and achieve real results with science-backed tracking.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-base px-8" data-testid="button-start-free-trial" onClick={handleSignup}>
                  <Zap className="mr-2 h-5 w-5" />
                  Get Started Free
                </Button>
                <Button size="lg" variant="outline" className="text-base px-8" data-testid="button-watch-demo">
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3" data-testid="avatars-users">
                  {[testimonial1, testimonial2, testimonial3].map((img, i) => (
                    <Avatar key={i} className="border-2 border-background h-10 w-10">
                      <AvatarImage src={img} alt={`User ${i + 1}`} />
                      <AvatarFallback>U{i + 1}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-semibold" data-testid="text-user-count">500K+ Active Users</div>
                  <div className="text-muted-foreground">Join the community</div>
                </div>
              </div>
            </div>

            {/* Right Column - App Preview (40%) */}
            <div className="lg:col-span-2 relative hidden lg:block" data-testid="preview-app">
              <div className="relative">
                <img
                  src={heroImage}
                  alt="Person tracking fitness on smartphone"
                  className="w-full rounded-2xl shadow-2xl"
                  data-testid="img-hero"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Bar */}
      <section className="bg-gradient-to-r from-primary/90 to-chart-2/90 text-primary-foreground py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-2" data-testid="stat-users">
              <div className="text-4xl sm:text-5xl font-bold">500K+</div>
              <div className="text-primary-foreground/90 text-sm sm:text-base">Active Users</div>
            </div>
            <div className="text-center space-y-2" data-testid="stat-activities">
              <div className="text-4xl sm:text-5xl font-bold">50M+</div>
              <div className="text-primary-foreground/90 text-sm sm:text-base">Activities Logged</div>
            </div>
            <div className="text-center space-y-2" data-testid="stat-weight">
              <div className="text-4xl sm:text-5xl font-bold">12 lbs</div>
              <div className="text-primary-foreground/90 text-sm sm:text-base">Avg. Weight Lost</div>
            </div>
            <div className="text-center space-y-2" data-testid="stat-success">
              <div className="text-4xl sm:text-5xl font-bold">94%</div>
              <div className="text-primary-foreground/90 text-sm sm:text-base">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 scroll-mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you track, analyze, and achieve your fitness goals
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 space-y-4 hover-elevate transition-all duration-300" data-testid="card-feature-registration">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Easy Registration</h3>
              <p className="text-muted-foreground">
                Get started in seconds with our streamlined sign-up process. No credit card required for your free trial.
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover-elevate transition-all duration-300" data-testid="card-feature-workouts">
              <div className="h-12 w-12 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <Activity className="h-6 w-6 text-chart-2" />
              </div>
              <h3 className="text-xl font-semibold">Workout Tracking</h3>
              <p className="text-muted-foreground">
                Log exercises, sets, reps, and weights. Track your strength progress over time with detailed analytics.
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover-elevate transition-all duration-300" data-testid="card-feature-meals">
              <div className="h-12 w-12 rounded-lg bg-chart-3/10 flex items-center justify-center">
                <Apple className="h-6 w-6 text-chart-3" />
              </div>
              <h3 className="text-xl font-semibold">Meal Logging</h3>
              <p className="text-muted-foreground">
                Track your nutrition with our comprehensive food database. Monitor calories, macros, and micronutrients.
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover-elevate transition-all duration-300" data-testid="card-feature-steps">
              <div className="h-12 w-12 rounded-lg bg-chart-4/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-chart-4" />
              </div>
              <h3 className="text-xl font-semibold">Daily Activity</h3>
              <p className="text-muted-foreground">
                Monitor your daily steps, active minutes, and calories burned. Stay motivated with achievement badges.
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover-elevate transition-all duration-300" data-testid="card-feature-status">
              <div className="h-12 w-12 rounded-lg bg-chart-5/10 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-chart-5" />
              </div>
              <h3 className="text-xl font-semibold">Status Updates</h3>
              <p className="text-muted-foreground">
                Mark activities as planned, in progress, or completed. Stay organized with smart reminders and notifications.
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover-elevate transition-all duration-300" data-testid="card-feature-management">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Edit3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Data Management</h3>
              <p className="text-muted-foreground">
                Edit or delete entries with ease. Your data is always in sync across all your devices.
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover-elevate transition-all duration-300" data-testid="card-feature-goals">
              <div className="h-12 w-12 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-chart-2" />
              </div>
              <h3 className="text-xl font-semibold">Goal Setting</h3>
              <p className="text-muted-foreground">
                Set personalized fitness goals and track your progress. Get intelligent recommendations based on your data.
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover-elevate transition-all duration-300" data-testid="card-feature-analytics">
              <div className="h-12 w-12 rounded-lg bg-chart-3/10 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-chart-3" />
              </div>
              <h3 className="text-xl font-semibold">Advanced Analytics</h3>
              <p className="text-muted-foreground">
                Visualize your progress with beautiful charts and insights. Make data-driven decisions about your health.
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover-elevate transition-all duration-300" data-testid="card-feature-reminders">
              <div className="h-12 w-12 rounded-lg bg-chart-4/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-chart-4" />
              </div>
              <h3 className="text-xl font-semibold">Smart Reminders</h3>
              <p className="text-muted-foreground">
                Never miss a workout or meal. Get personalized reminders that adapt to your schedule and preferences.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Deep Dive - Workout Tracking */}
      <section className="py-24 bg-muted/30" data-testid="section-deep-dive-workouts">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold" data-testid="badge-workout">
                Workout Tracking
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold" data-testid="text-workout-title">
                Track Every Rep, Set, and Personal Record
              </h2>
              <p className="text-lg text-muted-foreground" data-testid="text-workout-description">
                Log your workouts with precision and watch your strength grow over time. Our intelligent tracking system automatically calculates volume, intensity, and progression.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-chart-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">Exercise Library</div>
                    <div className="text-sm text-muted-foreground">Access 1000+ exercises with video demonstrations</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-chart-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">Progress Tracking</div>
                    <div className="text-sm text-muted-foreground">See strength gains and personal records at a glance</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-chart-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">Custom Routines</div>
                    <div className="text-sm text-muted-foreground">Build and save your own workout programs</div>
                  </div>
                </li>
              </ul>
            </div>
            <div data-testid="preview-workout">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Today's Workout</h3>
                    <Edit3 className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium" data-testid="text-exercise-name-1">Bench Press</div>
                        <Activity className="h-4 w-4 text-primary" />
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <div className="text-muted-foreground text-xs">Sets</div>
                          <div className="font-semibold" data-testid="text-sets-1">4</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs">Reps</div>
                          <div className="font-semibold" data-testid="text-reps-1">8-10</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs">Weight</div>
                          <div className="font-semibold" data-testid="text-weight-1">185 lbs</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-chart-2/5 border border-chart-2/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium" data-testid="text-exercise-name-2">Squats</div>
                        <Activity className="h-4 w-4 text-chart-2" />
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <div className="text-muted-foreground text-xs">Sets</div>
                          <div className="font-semibold" data-testid="text-sets-2">3</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs">Reps</div>
                          <div className="font-semibold" data-testid="text-reps-2">12</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs">Weight</div>
                          <div className="font-semibold" data-testid="text-weight-2">225 lbs</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border border-dashed rounded-lg">
                      <div className="text-center text-sm text-muted-foreground">
                        + Add Exercise
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Deep Dive - Nutrition Tracking (Alternating) */}
      <section className="py-24" data-testid="section-deep-dive-nutrition">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2 space-y-6">
              <div className="inline-block px-4 py-1.5 bg-chart-3/10 text-chart-3 rounded-full text-sm font-semibold" data-testid="badge-nutrition">
                Nutrition Tracking
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold" data-testid="text-nutrition-title">
                Master Your Nutrition with Precision Logging
              </h2>
              <p className="text-lg text-muted-foreground" data-testid="text-nutrition-description">
                Understand exactly what you're eating with our comprehensive food database and macro tracking. Make informed decisions about your diet.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-chart-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">Massive Food Database</div>
                    <div className="text-sm text-muted-foreground">Millions of foods with complete nutritional info</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-chart-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">Macro Tracking</div>
                    <div className="text-sm text-muted-foreground">Monitor protein, carbs, fats, and calories effortlessly</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-chart-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">Meal Planning</div>
                    <div className="text-sm text-muted-foreground">Plan your meals ahead and hit your nutrition goals</div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="lg:order-1" data-testid="preview-nutrition">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Daily Nutrition</h3>
                    <Apple className="h-4 w-4 text-chart-3" />
                  </div>
                  <div className="p-4 bg-chart-3/5 border border-chart-3/20 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium">Calories</div>
                      <div className="text-sm font-semibold" data-testid="text-calories">1,850 / 2,200</div>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-chart-3 rounded-full" style={{ width: '84%' }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Protein</div>
                      <div className="font-semibold" data-testid="text-protein">142g</div>
                      <div className="text-xs text-muted-foreground">/ 165g</div>
                    </div>
                    <div className="p-3 bg-chart-2/5 border border-chart-2/20 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Carbs</div>
                      <div className="font-semibold" data-testid="text-carbs">180g</div>
                      <div className="text-xs text-muted-foreground">/ 220g</div>
                    </div>
                    <div className="p-3 bg-chart-4/5 border border-chart-4/20 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Fats</div>
                      <div className="font-semibold" data-testid="text-fats">58g</div>
                      <div className="text-xs text-muted-foreground">/ 73g</div>
                    </div>
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-semibold text-muted-foreground">Recent Meals</div>
                    <div className="flex items-center justify-between text-sm">
                      <div data-testid="text-meal-1">Grilled Chicken Salad</div>
                      <div className="text-muted-foreground" data-testid="text-meal-calories-1">450 cal</div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div data-testid="text-meal-2">Protein Shake</div>
                      <div className="text-muted-foreground" data-testid="text-meal-calories-2">220 cal</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Deep Dive - Progress Analytics */}
      <section className="py-24 bg-muted/30" data-testid="section-deep-dive-analytics">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 bg-chart-1/10 text-chart-1 rounded-full text-sm font-semibold" data-testid="badge-analytics">
                Progress Analytics
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold" data-testid="text-analytics-title">
                Visualize Your Journey to Success
              </h2>
              <p className="text-lg text-muted-foreground" data-testid="text-analytics-description">
                Transform your data into actionable insights with beautiful charts and comprehensive reports. See exactly how far you've come.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-chart-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">Visual Progress Charts</div>
                    <div className="text-sm text-muted-foreground">Track weight, body measurements, and strength over time</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-chart-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">Weekly Reports</div>
                    <div className="text-sm text-muted-foreground">Get detailed summaries of your activities and achievements</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-chart-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">Goal Milestones</div>
                    <div className="text-sm text-muted-foreground">Celebrate every achievement along your journey</div>
                  </div>
                </li>
              </ul>
            </div>
            <div data-testid="preview-analytics">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Progress Overview</h3>
                    <BarChart3 className="h-4 w-4 text-primary" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Weight Lost</div>
                      <div className="text-2xl font-bold text-primary" data-testid="text-weight-lost">12 lbs</div>
                      <div className="text-xs text-muted-foreground mt-1">This month</div>
                    </div>
                    <div className="p-4 bg-chart-2/5 border border-chart-2/20 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Workouts</div>
                      <div className="text-2xl font-bold text-chart-2" data-testid="text-workouts-count">18</div>
                      <div className="text-xs text-muted-foreground mt-1">This month</div>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-primary/10 to-chart-2/10 border border-primary/10 rounded-lg">
                    <div className="text-xs font-semibold text-muted-foreground mb-3">Weekly Activity</div>
                    <div className="flex items-end justify-between h-24 gap-2" data-testid="chart-weekly-activity">
                      {[65, 80, 45, 90, 70, 85, 95].map((height, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end">
                          <div
                            className="bg-gradient-to-t from-primary to-chart-2 rounded-t-sm"
                            style={{ height: `${height}%` }}
                            data-testid={`bar-day-${i}`}
                          />
                          <div className="text-xs text-muted-foreground text-center mt-1">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-chart-2" />
                      <span>On track to goal</span>
                    </div>
                    <div className="font-semibold text-chart-2" data-testid="text-progress-percent">+15%</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 scroll-mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                  Science-Backed Fitness Tracking
                </h2>
                <p className="text-lg text-muted-foreground">
                  HealthTrack combines cutting-edge technology with proven fitness science to help you achieve lasting results.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Built by Experts</h4>
                    <p className="text-sm text-muted-foreground">
                      Developed in collaboration with certified nutritionists and fitness trainers
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-chart-2/10 flex items-center justify-center flex-shrink-0">
                    <Smartphone className="h-5 w-5 text-chart-2" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Always Available</h4>
                    <p className="text-sm text-muted-foreground">
                      Track your progress anywhere with our mobile apps for iOS and Android
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-chart-3/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-5 w-5 text-chart-3" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Real Results</h4>
                    <p className="text-sm text-muted-foreground">
                      Join thousands who have transformed their lives with HealthTrack
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="h-5 w-5 text-chart-3 fill-chart-3" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-semibold">4.9/5</span>
                </div>
                <span className="text-sm text-muted-foreground">App Store & Google Play</span>
              </div>
            </div>

            <div className="lg:col-span-3">
              <Card className="p-8 space-y-6">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-chart-2/20 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Activity className="h-16 w-16 text-primary mx-auto" />
                    <div className="space-y-2">
                      <div className="text-2xl font-bold">App Dashboard Preview</div>
                      <div className="text-muted-foreground">Track all your activities in one place</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">1,234</div>
                    <div className="text-sm text-muted-foreground">Workouts</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-chart-2">5,678</div>
                    <div className="text-sm text-muted-foreground">Meals</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-chart-3">890K</div>
                    <div className="text-sm text-muted-foreground">Steps</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 scroll-mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Trusted by Fitness Enthusiasts
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real people, real results, real transformations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 space-y-4" data-testid="card-testimonial-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 text-chart-3 fill-chart-3" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground italic">
                "HealthTrack completely changed how I approach fitness. The meal logging feature helped me understand my nutrition better, and I lost 15 pounds in 3 months!"
              </p>
              <div className="flex items-center gap-4 pt-2">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={testimonial1} />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">Sarah Chen</div>
                  <div className="text-sm text-muted-foreground">Lost 15 lbs in 3 months</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4" data-testid="card-testimonial-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 text-chart-3 fill-chart-3" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground italic">
                "As a busy professional, I needed something simple yet powerful. The workout tracking and progress analytics keep me motivated and accountable every single day."
              </p>
              <div className="flex items-center gap-4 pt-2">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={testimonial2} />
                  <AvatarFallback>MP</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">Marcus Powell</div>
                  <div className="text-sm text-muted-foreground">Increased strength by 40%</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4" data-testid="card-testimonial-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 text-chart-3 fill-chart-3" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground italic">
                "The step tracking and daily activity monitoring helped me build consistent habits. I went from sedentary to walking 10,000 steps daily. Game changer!"
              </p>
              <div className="flex items-center gap-4 pt-2">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={testimonial3} />
                  <AvatarFallback>EJ</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">Emily Johnson</div>
                  <div className="text-sm text-muted-foreground">10K+ daily steps achieved</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary/90 to-chart-2/90 text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Start Your Fitness Journey Today
            </h2>
            <p className="text-lg text-primary-foreground/90">
              Join over 500,000 users who have transformed their health with HealthTrack
            </p>

            <div className="space-y-4">
              <ul className="text-left max-w-md mx-auto space-y-2">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <span>No credit card required</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <span>14-day free trial</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <span>Cancel anytime</span>
                </li>
              </ul>
            </div>

            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 backdrop-blur-sm bg-background/10 text-primary-foreground border-primary-foreground/20 hover:bg-background/20"
              data-testid="button-cta-start"
              onClick={handleSignup}
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Activity className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">HealthTrack</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Transform your fitness journey with science-backed tracking and personalized insights.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-social-twitter">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-social-facebook">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-social-instagram">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-features">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-pricing">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-faq">FAQ</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-roadmap">Roadmap</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-blog">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-careers">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-contact">Contact</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Download App</h4>
              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 rounded-lg border hover-elevate transition-all"
                  data-testid="link-download-ios"
                >
                  <SiApple className="h-6 w-6" />
                  <div className="text-left">
                    <div className="text-xs text-muted-foreground">Download on</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 rounded-lg border hover-elevate transition-all"
                  data-testid="link-download-android"
                >
                  <SiGoogleplay className="h-6 w-6" />
                  <div className="text-left">
                    <div className="text-xs text-muted-foreground">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; 2025 HealthTrack. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors" data-testid="link-privacy">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors" data-testid="link-terms">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors" data-testid="link-cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
