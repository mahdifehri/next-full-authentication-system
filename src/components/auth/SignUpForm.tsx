"use client";

import { signIn } from "next-auth/react";
import * as React from "react";
import { FC } from "react";
import { Button } from "../ui/button";
import { Icons } from "../Icons";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { IState, countries, states } from "country-cities";
const allCountries = countries.all();
import { useForm } from "react-hook-form";
import { TSignUpSchema, signUpSchema } from "@/lib/validators/signUp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../ui/use-toast";

const SignUpForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    setValue,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const [open, setOpen] = React.useState(false);
  const [openState, setOpenState] = React.useState(false);
  const [countryValue, setCountryValue] = React.useState("");
  const [stateValue, setStateValue] = React.useState("");
  const [countryIsoCode, setCountryIsoCode] = React.useState("");
  const [phoneCode, setPhoneCode] = React.useState("");
  const [allStates, setAllStates] = React.useState<IState[]>([]);
  const { toast } = useToast();

  React.useEffect(() => {
    if (countryIsoCode !== "") {
      const statesData = states.getByCountry(countryIsoCode);
      setAllStates(statesData);
      console.log(allStates);
    }
  }, [countryIsoCode]);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const onSubmit = async (data: TSignUpSchema) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        toast({
          variant: "success",
          title: "Success !",
          description:
            "Your registration was successful. you are being redirected to the sign-in page.",
        });
        setTimeout(() => {
          window.location.href = "/sign-in";
        }, 2000);
      }
      if (response.status === 409) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            "This email address is already registered. Please use a different email or sign in.",
        });
        return;
      }
      const responseData = await response.json();
      if (responseData.errors) {
        const errors = responseData.errors;

        if (errors.email) {
          setError("email", {
            type: "server",
            message: errors.email,
          });
        } else if (errors.password) {
          setError("password", {
            type: "server",
            message: errors.password,
          });
        } else if (errors.confirmPassword) {
          setError("confirmPassword", {
            type: "server",
            message: errors.confirmPassword,
          });
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
        }
      }

      // reset();
    } catch {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };
  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            type="text"
            id="name"
            placeholder="Full Name"
            autoComplete="name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-2 text-center">{`${errors.name.message}`}</p>
          )}
        </div>
        <div>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-2 text-center">{`${errors.email.message}`}</p>
          )}
        </div>
        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="justify-between w-full"
              >
                {countryValue ? countryValue : "Select country"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0">
              <Command>
                <CommandInput placeholder="Search country..." />
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup>
                  {allCountries.map((country) => (
                    <CommandItem
                      key={country.name}
                      onSelect={(currentValue) => {
                        setCountryValue(
                          currentValue === countryValue ? "" : currentValue
                        );
                        setCountryIsoCode(country.isoCode);
                        setPhoneCode(country.phonecode);
                        setValue("country", currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          countryValue === country.name
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {country.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {errors.country && (
            <p className="text-red-500 text-xs mt-2 text-center">{`${errors.country.message}`}</p>
          )}
        </div>
        <Popover open={openState} onOpenChange={setOpenState}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openState}
              className="justify-between w-full"
            >
              {stateValue ? stateValue : "Select State"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" p-0">
            <Command>
              <CommandInput placeholder="Search state..." />
              <CommandEmpty>No state found.</CommandEmpty>
              <CommandGroup>
                {allStates.map((state) => (
                  <CommandItem
                    key={state.name}
                    onSelect={(currentValue) => {
                      setStateValue(
                        currentValue === stateValue ? "" : currentValue
                      );
                      setValue("state", currentValue);
                      setOpenState(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        stateValue === state.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {state.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <div>
          <div className="flex">
            <Input
              className="w-[20%] text-center"
              id="phone-number-code"
              disabled
              value={`+${phoneCode}`}
            />
            <Input
              type="tel"
              className="w-[80%] ml-2"
              id="phone-number"
              placeholder="Phone Number"
              autoComplete="tel"
              {...register("phoneNumber")}
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-2 text-center">{`${errors.phoneNumber.message}`}</p>
          )}
        </div>
        <div>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-2 text-center">{`${errors.password.message}`}</p>
          )}
        </div>
        <div>
          <Input
            type="password"
            id="confirm-password"
            placeholder="Confirm Password"
            autoComplete="new-password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-2 text-center">{`${errors.confirmPassword.message}`}</p>
          )}
        </div>
        <Button
          className="w-full"
          variant={"default"}
          disabled={isSubmitting}
          isLoading={isSubmitting}
          type="submit"
        >
          Create Account
        </Button>
      </form>
      <Button
        type="button"
        variant={"secondary"}
        size="sm"
        className="w-full"
        onClick={loginWithGoogle}
        disabled={isLoading}
        isLoading={isLoading}
      >
        {isLoading ? null : (
          <div className="relative inline-block">
            <span className="absolute -left-2 -top-1 bg-white rounded-full h-6 w-6 flex items-center justify-center">
              <Icons.google className="h-4 w-4 text-blue-600" />
            </span>
            <Icons.google className="h-4 w-4 mr-2" />
          </div>
        )}
        Google
      </Button>
    </>
  );
};

export default SignUpForm;
