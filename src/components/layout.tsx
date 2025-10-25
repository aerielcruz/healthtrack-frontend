import { Activity } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"
import { useLocation } from "wouter"
import { api } from "@/api"
import { LoadingOverlay } from "./loading-overlay"
import { useEffect } from "react"

export const Layout = ({ user, setUser = () => null, loading, setLoading, children }: any) => {
  const [location, navigate] = useLocation()

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    api.auth.user()
      .then((response) => {
        setUser({ ...user, ...response })
      })
  }

  const handleHome = () => {
    navigate('/')
  }

  const handleLogout = async () => {
    try {
      setLoading(true)
      const res = await api.auth.logout()
      if (res) {
        setUser(null);
        navigate('/login');
      }
    } catch (err) {
      alert('Failed to logout');
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {loading ? <LoadingOverlay /> : null}

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b backdrop-blur-lg bg-background/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleHome}>
              <Activity className="h-8 w-8 text-primary" data-testid="icon-logo" />
              <span className="text-xl font-bold" data-testid="text-brand">HealthTrack</span>
            </div>

            <div className="flex items-center gap-4">
              {/* <ThemeToggle /> */}
              <p className="text-gray-600">{user?.first_name} {user?.last_name}</p>
              {user ? <Button variant="outline" size="sm" className="hidden sm:inline-flex" data-testid="button-login" onClick={handleLogout}>
                Logout
              </Button> : null}
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  )
}