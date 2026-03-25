interface ResultChartProps {
  score: number;
  total: number;
}

export default function TestScoreChart({ score, total }: ResultChartProps) {
  const percentage = Math.round((score / total) * 100);
  const wrong = total - score;

  // Cấu hình vòng tròn
  const radius = 35; // Bán kính
  const stroke = 8; // Độ dày nét vẽ
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center gap-8 rounded-xl w-fit">
      {/* Phần biểu đồ tròn */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90 w-full h-full"
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        >
          {/* Vòng tròn nền (Màu cam - tượng trưng cho phần Sai) */}
          <circle
            stroke="rgb(251, 146, 60)" // Tailwind orange-400
            strokeWidth={stroke}
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Vòng tròn kết quả (Màu xanh - tượng trưng cho phần Đúng) */}
          <circle
            stroke="rgb(52, 211, 153)" // Tailwind emerald-400
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round" // Bo tròn đầu nét vẽ
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-1000 ease-out" // Hiệu ứng chạy mượt
          />
        </svg>

        {/* Số phần trăm ở giữa */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-gray-600">{percentage}%</span>
        </div>
      </div>

      {/* Phần chú thích (Legend) bên phải */}
      <div className="flex flex-col gap-3 font-semibold">
        {/* Hàng ĐÚNG */}
        <div className="flex items-center justify-between w-32">
          <span className="text-emerald-500 text-lg">Đúng</span>
          <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm">
            {score}
          </span>
        </div>

        {/* Hàng SAI */}
        <div className="flex items-center justify-between w-32">
          <span className="text-orange-600 text-lg">Sai</span>
          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
            {wrong}
          </span>
        </div>
      </div>
    </div>
  );
}
