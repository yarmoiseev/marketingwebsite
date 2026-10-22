import { TestimonialCard } from "@/components/testimonial-card";

export default function Home() {
  return (
    <main
      className="testimonial-page min-h-screen"
      aria-label="Customer testimonial"
    >
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center px-4 py-50 md:px-8">
        <TestimonialCard />
      </div>
    </main>
  );
}
