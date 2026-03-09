const SchemaMarkup = ({ data }: { data: Record<string, any> }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);

export default SchemaMarkup;
