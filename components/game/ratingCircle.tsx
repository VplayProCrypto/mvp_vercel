const RatingCircle = ({
  value,
  label,
  color,
}: {
  value: number
  label: string
  color: string
}) => (
  <div className="relative w-36 h-36 flex-shrink-0">
    <svg
      className="w-full h-full"
      viewBox="0 0 36 36">
      <path
        d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="#4A4A4A"
        strokeWidth="2"
      />
      <path
        d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeDasharray={`${value}, 100`}
      />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
      <span className="text-3xl font-bold">{value}</span>
      <span className="text-xs uppercase mt-1">{label}</span>
    </div>
  </div>
)

export default RatingCircle
