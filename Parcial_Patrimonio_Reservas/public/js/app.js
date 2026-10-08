const resultOutput = document.getElementById('result');

function showResult(data) {
  resultOutput.textContent = JSON.stringify(data, null, 2);
}

async function requestJson(path, options = {}) {
  try {
    const response = await fetch(path, options);
    const data = await response.json();
    showResult(data);
    return response.ok ? data : null;
  } catch (error) {
    showResult({ error: 'No se pudo conectar con el servidor.' });
    return null;
  }
}

function formBody(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function jsonOptions(method, body) {
  return { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) };
}

document.getElementById('spaceForm').addEventListener('submit', async event => {
  event.preventDefault();
  const body = formBody(event.currentTarget);
  body.maxCapacity = Number(body.maxCapacity);
  await requestJson('/api/spaces', jsonOptions('POST', body));
});

document.getElementById('bookingForm').addEventListener('submit', async event => {
  event.preventDefault();
  const body = formBody(event.currentTarget);
  body.spaceId = Number(body.spaceId);
  body.attendeeCount = Number(body.attendeeCount);
  await requestJson('/api/bookings', jsonOptions('POST', body));
});

document.getElementById('lookupForm').addEventListener('submit', async event => {
  event.preventDefault();
  const id = Number(formBody(event.currentTarget).bookingId);
  await requestJson(`/api/bookings/${id}`);
});

document.getElementById('approveButton').addEventListener('click', async () => {
  const id = Number(formBody(document.getElementById('lookupForm')).bookingId);
  if (!Number.isSafeInteger(id) || id < 1) return showResult({ error: 'ID inválido.' });
  await requestJson(`/api/bookings/${id}`, jsonOptions('PATCH', { status: 'APPROVED' }));
});

document.getElementById('loadSpaces').addEventListener('click', async () => {
  const spaces = await requestJson('/api/spaces');
  if (!spaces) return;
  const list = document.getElementById('spaceList');
  list.replaceChildren();
  for (const space of spaces) {
    const item = document.createElement('li');
    item.textContent = `${space.id}: ${space.name} — ${space.max_capacity} personas — ${space.conservation_status}`;
    list.appendChild(item);
  }
});
