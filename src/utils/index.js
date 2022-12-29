export async function getFloodData() {
  try {
    const response = await fetch(
      "http://environment.data.gov.uk/flood-monitoring/id/floods"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
