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

// integrations/calltow/client/client.ts
emit("chat:addSuggestion", `/${"sn-calltow" /* CallTow */}`, "Contact the tow services.", [
  { name: "description", help: "The description of the call" }
]);
onNet("sn:towCall" /* TowCallToClient */, async ({ source, name, description }) => {
  const playerPed = GetPlayerPed(-1);
  const [x, y, z] = GetEntityCoords(playerPed, true);
  const [lastStreet] = GetStreetNameAtCoord(x, y, z);
  const lastStreetName = GetStreetNameFromHashKey(lastStreet);
  setImmediate(() => {
    emitNet("sn:towCallUpdate" /* TowCallToServer */, {
      street: lastStreetName,
      name,
      description,
      position: { x, y, z },
      source
    });
  });
});
onNet("sn:towCallResponse" /* TowCallToClientResponse */, (state) => {
  if (state === "success") {
    createNotification({
      picture: "CHAR_PROPERTY_TOWING_IMPOUND" /* CHAR_PROPERTY_TOWING_IMPOUND */,
      icon: 1 /* ChatBox */,
      message: "Your call has been reported to any available tow drivers!",
      title: "Tow Truck Service"
    });
  } else {
    createNotification({
      picture: "CHAR_PROPERTY_TOWING_IMPOUND" /* CHAR_PROPERTY_TOWING_IMPOUND */,
      icon: 1 /* ChatBox */,
      message: "We were unable to process your tow call at this time.",
      title: "Failed to report call"
    });
  }
});
