"use client";

import { useState } from "react";

const junkFoods = [
  "burger", "hamburger", "pizza", "fries", "french fries", "chips", "crisps",
  "candy", "chocolate", "donut", "doughnut", "cake", "cookie", "cookies",
  "soda", "cola", "hot dog", "ice cream", "fried chicken", "nuggets", "nachos",
  "milkshake", "cupcake", "brownie", "instant noodles", "energy drink",
];

const healthyFoods = [
  "apple", "banana", "orange", "pear", "grapes", "strawberry", "blueberry",
  "watermelon", "mango", "avocado", "broccoli", "carrot", "spinach", "salad",
  "tomato", "cucumber", "rice", "beans", "lentils", "oatmeal", "oats", "egg",
  "eggs", "chicken", "fish", "salmon", "yogurt", "almonds", "nuts", "quinoa",
];

function normalize(value) {
  return value.toLowerCase().trim().replace(/[^a-z\s]/g, "").replace(/\s+/g, " ");
}

export default function Home() {
  const [food, setFood] = useState("");
  const [result, setResult] = useState(null);

  function checkFood(event) {
    event.preventDefault();
    const item = normalize(food);
    if (!item) {
      setResult({ type: "empty", title: "Type a food first", text: "Try something like apple, pizza, or broccoli." });
      return;
    }

    const isJunk = junkFoods.some((name) => item === name || item.includes(name));
    const isHealthy = healthyFoods.some((name) => item === name || item.includes(name));

    if (isJunk) {
      setResult({ type: "junk", title: `${food.trim()} is junk food`, text: "It is usually high in sugar, salt, or unhealthy fats. Enjoy it occasionally!" });
    } else if (isHealthy) {
      setResult({ type: "healthy", title: `${food.trim()} is not junk food`, text: "Great choice! It can be part of a balanced, nourishing diet." });
    } else {
      setResult({ type: "unknown", title: "We’re not sure about that one", text: "Check the ingredients: foods high in added sugar, salt, and saturated fat are best enjoyed less often." });
    }
  }

  function tryExample(example) {
    setFood(example);
    const isJunk = junkFoods.includes(example.toLowerCase());
    setResult(isJunk
      ? { type: "junk", title: `${example} is junk food`, text: "It is usually high in sugar, salt, or unhealthy fats. Enjoy it occasionally!" }
      : { type: "healthy", title: `${example} is not junk food`, text: "Great choice! It can be part of a balanced, nourishing diet." });
  }

  return (
    <main className="min-h-screen overflow-hidden">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-7 lg:px-8">
        <a href="#" className="flex items-center gap-3" aria-label="Automatic Lamp home">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-xl text-white">✦</span>
          <span className="text-lg font-bold tracking-tight">Automatic Lamp</span>
        </a>
        <a href="#how-it-works" className="text-sm font-semibold text-slate-600 transition hover:text-ink">How it works</a>
      </header>

      <section className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-20 pt-12 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-28 lg:pt-20">
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-amber-800">
            <span>●</span> Your simple food guide
          </div>
          <h1 className="max-w-2xl text-5xl font-black leading-[1.03] tracking-[-.045em] sm:text-6xl lg:text-7xl">
            Is it fuel,<br />or just <span className="relative text-peach">fun food?<span className="absolute -bottom-1 left-0 h-2 w-full rounded-full bg-peach/20" /></span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">Type in a food and we’ll help you understand if it’s junk food — no confusing nutrition labels needed.</p>

          <form onSubmit={checkFood} className="mt-9 max-w-xl rounded-2xl bg-white p-2 shadow-soft ring-1 ring-slate-200">
            <label htmlFor="food" className="sr-only">Enter a food</label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex min-w-0 flex-1 items-center gap-3 px-4">
                <svg className="h-5 w-5 shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
                <input id="food" value={food} onChange={(e) => setFood(e.target.value)} placeholder="Try ‘pizza’ or ‘apple’" className="h-14 w-full bg-transparent text-base outline-none placeholder:text-slate-400" autoComplete="off" />
              </div>
              <button className="h-14 rounded-xl bg-ink px-7 font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-300" type="submit">Check my food →</button>
            </div>
          </form>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <span>Try:</span>
            {["Apple", "Pizza", "Broccoli"].map((item) => <button key={item} onClick={() => tryExample(item)} className="rounded-full border border-slate-300 bg-white px-3 py-1.5 font-medium text-slate-600 transition hover:border-ink hover:text-ink">{item}</button>)}
          </div>

          {result && (
            <div role="status" className={`mt-7 max-w-xl rounded-2xl border p-5 ${result.type === "healthy" ? "border-emerald-200 bg-emerald-50" : result.type === "junk" ? "border-orange-200 bg-orange-50" : "border-slate-200 bg-white"}`}>
              <div className="flex gap-4">
                <span className="text-2xl" aria-hidden="true">{result.type === "healthy" ? "✓" : result.type === "junk" ? "!" : "?"}</span>
                <div><h2 className="font-bold capitalize">{result.title}</h2><p className="mt-1 text-sm leading-6 text-slate-600">{result.text}</p></div>
              </div>
            </div>
          )}
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:mx-0">
          <div className="absolute -left-16 -top-16 h-36 w-36 rounded-full bg-[#dce9df]" />
          <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-[#f8d7c8]" />
          <div className="relative rotate-2 rounded-[2.5rem] bg-[#e9dfcf] p-7 shadow-soft sm:p-10">
            <div className="grid aspect-square grid-cols-2 gap-4 rounded-[2rem] bg-white/75 p-5 sm:gap-6 sm:p-8">
              <FoodTile color="bg-[#dce9df]" emoji="🥑" label="Everyday fuel" rotate="-rotate-3" />
              <FoodTile color="bg-[#f8d7c8]" emoji="🍩" label="Sometimes food" rotate="rotate-3" />
              <FoodTile color="bg-[#fae9a9]" emoji="🍌" label="Naturally good" rotate="rotate-2" />
              <FoodTile color="bg-[#d8e6ef]" emoji="🍔" label="Enjoy mindfully" rotate="-rotate-2" />
            </div>
            <div className="absolute -right-4 -top-5 rotate-6 rounded-xl bg-ink px-4 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg">Know your food!</div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-t border-slate-200 bg-white/60">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-3 lg:px-8">
          <Step number="01" title="Type a food" text="Enter any snack, meal, fruit, or vegetable you’re curious about." />
          <Step number="02" title="Get a simple answer" text="We compare it with common foods and explain the result in plain language." />
          <Step number="03" title="Choose with confidence" text="Remember: balance matters, and every food can have a place sometimes." />
        </div>
      </section>
    </main>
  );
}

function FoodTile({ color, emoji, label, rotate }) {
  return <div className={`${color} ${rotate} flex flex-col items-center justify-center rounded-3xl p-3 text-center shadow-sm`}><span className="text-5xl sm:text-6xl">{emoji}</span><span className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-600">{label}</span></div>;
}

function Step({ number, title, text }) {
  return <div className="flex gap-4"><span className="text-sm font-black text-peach">{number}</span><div><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></div></div>;
}
