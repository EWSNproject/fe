const yellowPalette = [
  '#FFF2BD', '#FFECA0', '#FFE57E', '#FFDE59', '#E0B300',
  '#FFD700', '#FFCB00', '#FFBA00', '#FFA500', '#FF9900', '#FF8C00'
];

export default function LineLoading({ size = 12 }) {
  return (
    <div style={{ display: 'flex', gap: size / 2 }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: yellowPalette[i],
            animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`
          }}
        />
      ))}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.5); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
