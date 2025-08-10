import { Button } from "@/components/common/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/common/shadcn/card";
import { Input } from "@/components/common/shadcn/input";
import { Separator } from "@/components/common/shadcn/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/common/shadcn/sidebar";
import { Skeleton } from "@/components/common/shadcn/skeleton";

export default function ThemeTester() {
  return (
    <div className="space-y-8 p-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Stone 테마 테스터</h1>
        <p className="text-muted-foreground">
          다양한 컴포넌트로 stone 색상 팔레트를 확인해보세요
        </p>
      </div>

      {/* Button Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Button Variants</CardTitle>
          <CardDescription>
            Primary, Secondary 등 다양한 버튼 스타일
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </CardContent>
      </Card>

      {/* Card Variations */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>기본 카드</CardTitle>
            <CardDescription>Card와 Card-foreground 색상 확인</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Muted-foreground 색상으로 된 텍스트입니다.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>다른 카드</CardTitle>
            <CardDescription>Background와 Foreground 대비</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="bg-secondary h-4 rounded"></div>
              <div className="bg-muted h-4 rounded"></div>
              <div className="bg-accent h-4 rounded"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>색상 샘플</CardTitle>
            <CardDescription>Primary Ring과 Border 색상</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="rounded border p-2">Border 색상</div>
              <div className="ring-ring rounded p-2 ring-2">Ring 색상</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Elements */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Elements</CardTitle>
          <CardDescription>Hover, Focus 상태 확인</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button className="hover:bg-primary/90">Hover Effect</Button>
            <Button variant="outline" className="hover:bg-accent">
              Outline Hover
            </Button>
            <Button
              variant="ghost"
              className="hover:bg-accent hover:text-accent-foreground"
            >
              Ghost Hover
            </Button>
          </div>

          <div className="space-y-2">
            <div className="bg-secondary text-secondary-foreground rounded p-3">
              Secondary Background
            </div>
            <div className="bg-muted text-muted-foreground rounded p-3">
              Muted Background
            </div>
            <div className="bg-accent text-accent-foreground rounded p-3">
              Accent Background
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Typography Test */}
      <Card>
        <CardHeader>
          <CardTitle>Typography Test</CardTitle>
          <CardDescription>다양한 텍스트 색상 확인</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Foreground 색상</h2>
            <p className="text-muted-foreground">Muted-foreground 색상</p>
            <p className="text-primary">Primary 색상</p>
            <p className="text-secondary-foreground">
              Secondary-foreground 색상
            </p>
            <p className="text-accent-foreground">Accent-foreground 색상</p>
            <p className="text-destructive">Destructive 색상</p>
          </div>
        </CardContent>
      </Card>

      {/* Form Elements */}
      <Card>
        <CardHeader>
          <CardTitle>Form Elements</CardTitle>
          <CardDescription>Input, Separator 등 폼 요소들</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Input 테스트</label>
            <Input placeholder="Input border와 focus 색상 확인" />
          </div>

          <Separator />

          <div className="space-y-2">
            <label className="text-sm font-medium">Disabled Input</label>
            <Input placeholder="Disabled input" disabled />
          </div>
        </CardContent>
      </Card>

      {/* Sidebar Test */}
      <SidebarProvider>
        <SidebarTrigger />
      </SidebarProvider>
      <Card>
        <CardHeader>
          <CardTitle>Sidebar Test</CardTitle>
          <CardDescription>Sidebar 관련 색상들 확인</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 overflow-hidden rounded-lg border">
            <SidebarProvider>
              <div className="flex h-full">
                <Sidebar className="w-64">
                  <SidebarHeader className="p-4">
                    <h3 className="font-semibold">Sidebar Header</h3>
                  </SidebarHeader>
                  <SidebarContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton>메뉴 아이템 1</SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>메뉴 아이템 2</SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>메뉴 아이템 3</SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarContent>
                </Sidebar>
                <div className="flex-1 p-4">
                  <SidebarTrigger />
                  <p className="text-muted-foreground mt-2 text-sm">
                    Sidebar 배경, 테두리, 메뉴 색상 확인
                  </p>
                </div>
              </div>
            </SidebarProvider>
          </div>
        </CardContent>
      </Card>

      {/* Loading States */}
      <Card>
        <CardHeader>
          <CardTitle>Loading States</CardTitle>
          <CardDescription>Skeleton 컴포넌트 색상 확인</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dark Mode Toggle Area */}
      <Card>
        <CardHeader>
          <CardTitle>테마 전환 테스트</CardTitle>
          <CardDescription>
            다크 모드와 라이트 모드에서 색상 확인
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            브라우저 개발자 도구에서 html 태그에 dark 클래스를 추가/제거하여
            다크 모드를 테스트해보세요.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
