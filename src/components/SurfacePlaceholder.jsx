const CONTENT = {
  profile: 'Profile surface will live here.',
  connect: 'Connection layer will live here.',
};

function SurfacePlaceholder({ view }) {
  const message = CONTENT[view];
  if (!message) return null;

  return (
    <div className="surface-placeholder" aria-label={view}>
      <p className="surface-placeholder__message">{message}</p>
    </div>
  );
}

export default SurfacePlaceholder;
