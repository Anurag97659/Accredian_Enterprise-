import { NextResponse } from "next/server";

export async function GET() {
  const testimonials = [
    {
      id: 1,
      name: "Ritu Sharma",
      role: "Head of L&D",
      company: "Delta FinServ",
      quote:
        "Accredian helped us convert scattered upskilling programs into one coherent, measurable workforce engine.",
    },
    {
      id: 2,
      name: "Arvind Nair",
      role: "VP Talent Transformation",
      company: "NexCore Systems",
      quote:
        "We reduced role-ramp time by nearly 40% while improving candidate confidence and manager satisfaction.",
    },
    {
      id: 3,
      name: "Sneha Kapoor",
      role: "CHRO",
      company: "Astra Retail Group",
      quote:
        "The mentor and project model made our internal transitions smoother and dramatically increased completion rates.",
    },
  ];

  return NextResponse.json({ testimonials });
}
