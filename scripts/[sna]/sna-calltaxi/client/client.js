"use strict";

// src/utils/notification.ts
function createNotification(options) {
  SetNotificationTextEntry("STRING");
  AddTextComponentString(options.message);
  SetNotificationMessage(
    options.picture,
    options.picture,
    true,
    options.icon ?? 0 /* None */,
    options.title,
    options.subject ?? ""
  );
}

// integrations/calltaxi/client/client.ts
emit("chat:addSuggestion", `/${"sn-calltaxi" /* CallTaxi */}`, "Contact the taxi services.", [
  { name: "description", help: "The description of the call" }
]);
onNet("sn:taxiCall" /* TaxiCallToClient */, async ({ source, name, description }) => {
  const playerPed = GetPlayerPed(-1);
  const [x, y, z] = GetEntityCoords(playerPed, true);
  const [lastStreet] = GetStreetNameAtCoord(x, y, z);
  const lastStreetName = GetStreetNameFromHashKey(lastStreet);
  setImmediate(() => {
    emitNet("sn:taxiCallUpdate" /* TaxiCallToServer */, {
      street: lastStreetName,
      name,
      description,
      position: { x, y, z },
      source
    });
  });
});
onNet("sn:taxiCallResponse" /* TaxiCallToClientResponse */, (state) => {
  if (state === "success") {
    createNotification({
      picture: "CHAR_TAXI" /* CHAR_TAXI */,
      icon: 1 /* ChatBox */,
      message: "Your call has been reported to any available taxi drivers!",
      title: "Taxi Service"
    });
  } else {
    createNotification({
      picture: "CHAR_TAXI" /* CHAR_TAXI */,
      icon: 1 /* ChatBox */,
      message: "We were unable to process your taxi call at this time.",
      title: "Failed to report call"
    });
  }
});
