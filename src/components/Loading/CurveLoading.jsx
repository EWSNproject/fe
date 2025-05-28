const yellowPalette = [
  '#FFFEFC', '#FFFDF4', '#FFFAE7', '#FFF7D5', '#FFF2BD',
  '#FFECA0', '#FFE57E', '#FFDE59', '#E0B300', '#FFD700',
  '#FFCB00', '#FFBA00', '#FFA500', '#FF9900', '#FF8C00'
];

export default function CurveLoading({ size = 10 }) {
  const radius = size * 2;
  return (
    <div
      style={{
        width: radius * 2,
        height: radius * 2,
        position: 'relative',
        animation: 'spin 1.2s linear infinite'
      }}
    >
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (360 / 6) * i;
        const x = radius + radius * Math.cos((angle * Math.PI) / 180) - size / 2;
        const y = radius + radius * Math.sin((angle * Math.PI) / 180) - size / 2;
        return (
          <div
            key={i}
            style={{
              width: size,
              height: size,
              borderRadius: '50%',
              backgroundColor: yellowPalette[i + 2],
              position: 'absolute',
              top: y,
              left: x
            }}
          />
        );
      })}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
