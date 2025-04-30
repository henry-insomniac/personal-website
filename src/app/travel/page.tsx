import ListItem from "@/components/ListItem";
import AnimateFadeInUp from "@/components/AnimateFadeInUp";

// Mock Data for Travel (replace with actual data fetching later)
const mockTravel = [
  {
    type: "travel" as const,
    title: "日本山间小径",
    description: "沿着长野县的宁静山路徒步旅行",
    date: "1月9日",
    href: "/travel/japan-trails",
    imageUrl: "/placeholder-mountain.jpg", // 使用首页的占位图
    tag: "徒步",
  },
  {
    type: "travel" as const,
    title: "京都红叶狩",
    description: "在秋季探索京都的古老寺庙和园林",
    date: "去年11月",
    href: "/travel/kyoto-autumn",
    imageUrl: "/placeholder-temple.jpg", // 需要新的占位图
    tag: "文化",
  },
  {
    type: "travel" as const,
    title: "冰岛极光之旅",
    description: "追逐北极光，体验冰岛的冬季奇观",
    date: "去年12月",
    href: "/travel/iceland-aurora",
    imageUrl: "/placeholder-aurora.jpg", // 需要新的占位图
    tag: "探险",
  },
];

export default function TravelPage() {
  return (
    <div className="space-y-12 pt-8 md:pt-16">
      <AnimateFadeInUp>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
          旅行
        </h1>
      </AnimateFadeInUp>
      <section className="space-y-8">
        {mockTravel.map((item, index) => (
          <AnimateFadeInUp key={item.href} delay={`${index * 0.1 + 0.2}s`}>
            <ListItem {...item} />
          </AnimateFadeInUp>
        ))}
      </section>
    </div>
  );
}
