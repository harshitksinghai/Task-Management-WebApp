import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Icons } from "@/components/ui/icons";
import apiRequest from "@/connects/apiRequest";
import { cn } from "@/lib/utils";
import * as React from "react";
import { useNavigate } from "react-router-dom";

interface LoginUserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegisterForm({ className, ...props }: LoginUserAuthFormProps) {
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showPasswordInput, setShowPasswordInput] =
    React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await apiRequest.post(`/api/users`, {
        name,
        email,
        password,
      });
      navigate("/main");
    } catch (err: any) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Reset any previous error message
    setError("");

    // Validate name
    if (!name || name.length < 3 || name.length > 20) {
      setError("Name must be between 3 and 20 characters");
      return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Invalid email format");
      return;
    }

    // Validate password if the password field is shown
    if (showPasswordInput) {
      // Validate password presence
      if (!password) {
        setError("Password is required");
        return;
      }
    }

    if (showPasswordInput) {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        submitHandler(e);
      }, 620);
    } else {
      setShowPasswordInput(true);
    }
  }

  function handleNameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleEmailInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handlePasswordInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Your Name"
              type="text"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
              value={name}
              onChange={handleNameInputChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={handleEmailInputChange}
            />
          </div>
          {showPasswordInput && (
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                autoComplete="current-password"
                autoCorrect="off"
                disabled={isLoading}
                value={password}
                onChange={handlePasswordInputChange}
              />
            </div>
          )}
          <Button disabled={isLoading} onClick={onSubmit}>
            {isLoading && showPasswordInput && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {showPasswordInput
              ? "Continue with Password"
              : "Sign up with Email"}
          </Button>
          {error && (
            <span className="text-red-500 text-center text-sm text-muted-foreground">
              {error}
            </span>
          )}
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button variant="outline" type="button" disabled={isLoading}>
        <Icons.gitHub className="mr-2 h-4 w-4" />
        GitHub
      </Button>
    </div>
  );
}
