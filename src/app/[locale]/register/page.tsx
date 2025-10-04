"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  Loader2,
  AtSign,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/common/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/common/shadcn/card";
import { Checkbox } from "@/components/common/shadcn/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/common/shadcn/form";
import { Input } from "@/components/common/shadcn/input";
import { Separator } from "@/components/common/shadcn/separator";
import { registerSchema, type RegisterFormData } from "@/types/auth";

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const tMessages = useTranslations("auth.messages");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingName, setIsCheckingName] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [nameStatus, setNameStatus] = useState<
    "idle" | "checking" | "available" | "unavailable"
  >("idle");
  const [emailStatus, setEmailStatus] = useState<
    "idle" | "sending" | "sent" | "verified"
  >("idle");

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAgreement: false,
    },
  });

  const handleCheckName = async () => {
    const name = form.getValues("name");
    if (!name || name.length < 2) {
      toast.error("이름을 2자 이상 입력해주세요");
      return;
    }

    setIsCheckingName(true);
    setNameStatus("checking");

    try {
      // TODO: 실제 API 호출로 교체
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 모의 응답 - 실제로는 서버에서 중복 확인
      const isAvailable = Math.random() > 0.5;

      if (isAvailable) {
        setNameStatus("available");
        toast.success(t("available"));
      } else {
        setNameStatus("unavailable");
        toast.error(t("unavailable"));
      }
    } catch (error) {
      console.error("Name check error:", error);
      setNameStatus("idle");
      toast.error("중복 확인 중 오류가 발생했습니다");
    } finally {
      setIsCheckingName(false);
    }
  };

  const handleSendEmailVerification = async () => {
    const email = form.getValues("email");
    if (!email || !email.includes("@")) {
      toast.error("올바른 이메일을 입력해주세요");
      return;
    }

    setIsSendingEmail(true);
    setEmailStatus("sending");

    try {
      // TODO: 실제 API 호출로 교체
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setEmailStatus("sent");
      toast.success(t("verificationSent"));
    } catch (error) {
      console.error("Email verification error:", error);
      setEmailStatus("idle");
      toast.error("인증번호 전송 중 오류가 발생했습니다");
    } finally {
      setIsSendingEmail(false);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    if (nameStatus !== "available") {
      toast.error("이름 중복확인을 해주세요");
      return;
    }

    if (emailStatus !== "verified") {
      toast.error("이메일 인증을 완료해주세요");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: 실제 API 호출로 교체
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Register data:", data);
      toast.success(tMessages("registerSuccess"));

      // TODO: 회원가입 성공 후 리다이렉트 처리
    } catch (error) {
      console.error("Register error:", error);
      toast.error(tMessages("registerError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold">{t("title")}</CardTitle>
            <CardDescription className="text-muted-foreground">
              {t("subtitle")}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <AtSign className="h-4 w-4" />
                        {t("name")}
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute top-1/2 left-3 -translate-y-1/2">
                            <AtSign className="text-muted-foreground h-4 w-4" />
                          </div>
                          <Input
                            placeholder={t("namePlaceholder")}
                            {...field}
                            disabled={isLoading || nameStatus === "available"}
                            className="pr-24 pl-10"
                          />
                          <div className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-1">
                            {nameStatus === "available" && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            {nameStatus === "unavailable" && (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={handleCheckName}
                              disabled={
                                isCheckingName ||
                                isLoading ||
                                !field.value ||
                                field.value.length < 2
                              }
                              className="h-7 px-2 text-xs"
                            >
                              {isCheckingName ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                t("checkDuplicate")
                              )}
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                      <div className="text-muted-foreground text-xs">
                        {t("nameNote")}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("email")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="email"
                            placeholder={t("emailPlaceholder")}
                            {...field}
                            disabled={isLoading || emailStatus === "verified"}
                            className="pr-20"
                          />
                          <div className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-1">
                            {emailStatus === "verified" && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={handleSendEmailVerification}
                              disabled={
                                isSendingEmail ||
                                isLoading ||
                                !field.value ||
                                !field.value.includes("@")
                              }
                              className="h-7 px-2 text-xs"
                            >
                              {isSendingEmail ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : emailStatus === "sent" ||
                                emailStatus === "verified" ? (
                                t("verified")
                              ) : (
                                t("sendVerification")
                              )}
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                      <div className="text-muted-foreground text-xs">
                        {t("emailNote")}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("password")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder={t("passwordPlaceholder")}
                            {...field}
                            disabled={isLoading}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("confirmPassword")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder={t("confirmPasswordPlaceholder")}
                            {...field}
                            disabled={isLoading}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            disabled={isLoading}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="termsAgreement"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          {t("termsAgreement")}
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {tMessages("loading")}
                    </>
                  ) : (
                    t("registerButton")
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-6">
              <Separator className="my-4" />
              <div className="text-muted-foreground text-center text-sm">
                {t("hasAccount")}{" "}
                <Link
                  href="/login"
                  className="text-primary font-medium hover:underline"
                >
                  {t("signIn")}
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
