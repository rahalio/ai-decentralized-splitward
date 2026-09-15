type Props = {
  clientLayers?: string;
  serverLayers?: string;
};

export function CutLayerDiagram({
  clientLayers = "Site vault layers (labels stay local)",
  serverLayers = "Coordinator cut-layer (activations only)",
}: Props) {
  return (
    <div className="cut-diagram" aria-label="Split learning cut-layer diagram">
      <div className="cut-side">
        <strong>Client</strong>
        <p>{clientLayers}</p>
      </div>
      <div className="cut-line" aria-hidden />
      <div className="cut-side">
        <strong>Server</strong>
        <p>{serverLayers}</p>
      </div>
    </div>
  );
}
