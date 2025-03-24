import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample data for templates
const featuredTemplates = [
  {
    id: 1,
    title: "Business Pro",
    category: "Business",
    price: 49,
    image: "/placeholder.svg?height=600&width=800",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    title: "Portfolio Plus",
    category: "Portfolio",
    price: 39,
    image: "/placeholder.svg?height=600&width=800",
    rating: 4.7,
    reviews: 98,
    featured: true,
  },
  {
    id: 3,
    title: "SaaS Landing",
    category: "SaaS",
    price: 59,
    image: "/placeholder.svg?height=600&width=800",
    rating: 4.9,
    reviews: 156,
  },
  {
    id: 4,
    title: "Agency Hub",
    category: "Agency",
    price: 69,
    image: "/placeholder.svg?height=600&width=800",
    rating: 4.6,
    reviews: 87,
  },
]

// Sample data for categories
const categories = [
  { name: "Business", count: 24, icon: "💼" },
  { name: "Portfolio", count: 18, icon: "🎨" },
  { name: "SaaS", count: 32, icon: "⚙️" },
  { name: "Agency", count: 15, icon: "🏢" },
  { name: "E-commerce", count: 21, icon: "🛒" },
  { name: "Blog", count: 12, icon: "📝" },
]

// Sample data for testimonials
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Founder, DesignCraft",
    content:
      "The templates from TemplateLab helped us launch our business website in record time. The quality and attention to detail is outstanding.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marketing Director, TechFlow",
    content:
      "We've purchased multiple templates and they've all been exceptional. The code is clean, well-documented, and easy to customize.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Freelance Developer",
    content:
      "As a freelancer, these templates have been a game-changer for my client projects. They save me time and my clients love the results.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Chào mừng bạn đến với TemplateRock
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Chúng tôi cung cấp các mẫu trang web chất lượng cao, hiện đại và dễ tùy chỉnh cho mọi nhu cầu của bạn.
              
             
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/templates">Xem ngay </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Tìm hiểu thêm</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tại sao nên chọn chúng tôi</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Các mẫu của chúng tôi được thiết kế để giúp bạn tiết kiệm thời gian và công sức trong việc phát triển trang web. Dưới đây là một số lý do tại sao bạn nên chọn TemplateLab:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 2H2v10h10V2Z" />
                  <path d="M22 12h-4v10h4V12Z" />
                  <path d="M14 12h-4v10h4V12Z" />
                  <path d="M22 2h-8v6h8V2Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
              <p className="text-muted-foreground">
                Tất cả các mẫu đều được tối ưu hóa cho mọi thiết bị, từ máy tính để bàn đến điện thoại di động.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Modern Technologies</h3>
              <p className="text-muted-foreground">
                Xây dựng trên các công nghệ hiện đại như React, Next.js và Tailwind CSS để đảm bảo hiệu suất tối ưu.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Customization</h3>
              <p className="text-muted-foreground">
                Các mẫu được thiết kế để dễ dàng tùy chỉnh, giúp bạn tạo ra một trang web độc đáo mà không cần phải viết mã.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Danh mục của chúng tôi</h2>
              <p className="text-muted-foreground max-w-2xl">
                Chúng tôi cung cấp một loạt các mẫu cho nhiều loại hình doanh nghiệp và nhu cầu khác nhau. Dưới đây là một số danh mục chính mà bạn có thể khám phá:
              </p>
            </div>
            <Button variant="ghost" className="mt-4 md:mt-0" asChild>
              <Link href="/templates" className="flex items-center">
                View All Categories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={`/templates?category=${category.name.toLowerCase()}`} className="group">
                <div className="bg-background border rounded-lg p-6 transition-all hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl mb-2">{category.icon}</div>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground">{category.count} templates</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Templates Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Template nổi bật</h2>
              <p className="text-muted-foreground max-w-2xl">
                Các mẫu nổi bật của chúng tôi được chọn lọc kỹ càng để đảm bảo chất lượng và tính năng tốt nhất cho bạn.
              </p>
            </div>
            <Button variant="ghost" className="mt-4 md:mt-0" asChild>
              <Link href="/templates" className="flex items-center">
                Xem tất cả <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTemplates.map((template) => (
              <Card key={template.id} className="group overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={template.image || "/placeholder.svg"}
                    alt={template.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  {template.featured && <Badge className="absolute top-2 left-2 z-10">Nổi bật</Badge>}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{template.title}</h3>
                      <p className="text-sm text-muted-foreground">{template.category}</p>
                    </div>
                    <p className="font-bold">${template.price}</p>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                      <span>{template.rating}</span>
                    </div>
                    <span className="mx-2">•</span>
                    <span>{template.reviews} đánh giá</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" className="w-full" asChild>
                      <Link href={`/templates/${template.id}`}>Xem thử</Link>
                    </Button>
                    <Button size="sm" className="w-full">
                      Mua ngay
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Khách hàng chúng tôi nói gì về TemplateRock ?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi tự hào về chất lượng sản phẩm và dịch vụ của mình. Dưới đây là một số phản hồi từ khách hàng của chúng tôi:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-background border rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Bạn đã sẵn sàng chưa?</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Khám phá bộ sưu tập mẫu của chúng tôi và tìm kiếm giải pháp hoàn hảo cho dự án tiếp theo của bạn. Chúng tôi có mọi thứ bạn cần để tạo ra một trang web đẹp và hiệu quả.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/templates">Xem ngay</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent" asChild>
                <Link href="/contact">Liên hệ</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

