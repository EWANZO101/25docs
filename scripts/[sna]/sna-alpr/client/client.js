"use strict";

// integrations/alpr/client/client.ts
onNet("sn:cadBoloResults" /* ALPRCadBoloResults */, (plate, body) => {
  if (!body || body === "failed")
    return;
  if (body.bolos.length > 0) {
    emit("sna-sync:create-notification" /* CreateNotification */, {
      title: "Active Bolo Notice",
      message: `${plate} has an active BOLO. Open SnailyCAD for more details.`
    });
  }
});
onNet("sn:cadPlateResults" /* ALPRCadPlateResults */, (plate, body) => {
  var _a, _b, _c, _d;
  if (!body || body === "failed") {
    return emit("sna-sync:create-notification" /* CreateNotification */, {
      message: "Unable to fetch plate search results: failed to fetch.",
      title: "Plate Search Results"
    });
  }
  const [vehicle] = body;
  if (!vehicle) {
    return emit("sna-sync:create-notification" /* CreateNotification */, {
      message: `Plate is not registered: ${plate}`,
      title: "Plate Search Results"
    });
  }
  const owner = vehicle.citizen ? `${vehicle.citizen.name} ${vehicle.citizen.surname}` : "Unknown";
  const message = [
    `<li><b>Plate:</b> ${plate}</li>`,
    `<li><b>Model:</b> ${vehicle.model.value.value}</li>`,
    `<li><b>Color:</b> ${vehicle.color}</li>`,
    `<li><b>VIN Number:</b> ${vehicle.vinNumber}</li>`,
    `<li><b>Owner:</b> ${owner}</li>`
  ];
  emit("sna-sync:create-notification" /* CreateNotification */, {
    message: message.join("\n"),
    title: "Plate Search Results",
    timeout: 17e3
  });
  const warrants = ((_b = (_a = vehicle.citizen) == null ? void 0 : _a.warrants) == null ? void 0 : _b.filter((v) => v.status === "ACTIVE")) ?? [];
  const hasWarrants = warrants.length > 0;
  if (hasWarrants) {
    const citizenFullName = `${(_c = vehicle.citizen) == null ? void 0 : _c.name} ${(_d = vehicle.citizen) == null ? void 0 : _d.surname}`;
    emit("sna-sync:create-notification" /* CreateNotification */, {
      title: "Active Warrants Notice",
      message: `This vehicle - ${citizenFullName} - owner has active warrants.`
    });
  }
});
