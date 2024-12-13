const MODULE_ID = "update-your-password";

function updatePasswordDialog() {
  new Dialog({
    title: game.i18n.localize("update-your-password.dialog.title"),
    content: `
		<form>
      <div class="form-group">
        <label for="${MODULE_ID}-new-password">
          ${game.i18n.localize("update-your-password.dialog.label.contents")}
        </label>
        <div class="form-fields">
          <input id="${MODULE_ID}-new-password" type="password" name="newPassword">
        </div>
      </div>
      <div class="form-group">
        <label for="${MODULE_ID}-confirm-new-password">
          ${game.i18n.localize("update-your-password.dialog.confirm-label.contents")}
        </label>
        <div class="form-fields">
          <input id="${MODULE_ID}-confirm-new-password" type="password" name="newPassword">
        </div>
      </div>		
		</form>`,

    buttons: {
      apply: {
        icon: '<i class="fa-solid fa-check"></i>',
        label: game.i18n.localize("update-your-password.dialog.buttons.apply.label"),
        callback: async (html) => {
          const fde = new FormDataExtended(html[0].querySelector("form"));
          const { newPassword, confirmNewPassword } = fde.object;
          if (newPassword !== confirmNewPassword) {
            return ui.notifications.error("update-your-password.notifications.error.confirm-not-match", {
              localize: true,
            });
          }

          if (newPassword.length !== 0) {
            await game.user.update({ password: newPassword });
          }
        },
      },
      cancel: {
        icon: '<i class="fa-solid fa-times"></i>',
        label: game.i18n.localize("update-your-password.dialog.buttons.cancel.label"),
      },
    },
    default: "apply",
  }).render(true);
}

Hooks.on("init", function () {
  game.settings.register(MODULE_ID, "show-token-tool", {
    name: "update-your-password.settings.show-token-tool.name",
    hint: "update-your-password.settings.show-token-tool.hint",
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
    requiresReload: true,
  });
  game.settings.register(MODULE_ID, "show-user-context-menu", {
    name: "update-your-password.settings.show-user-context-menu.name",
    hint: "update-your-password.settings.show-user-context-menu.hint",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
    requiresReload: true,
  });
  game.settings.register(MODULE_ID, "expose-dialog-function", {
    name: "update-your-password.settings.expose-dialog-function.name",
    hint: "update-your-password.settings.expose-dialog-function.hint",
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
    requiresReload: true,
  });
});

Hooks.on("getSceneControlButtons", function (controls) {
  if (game.settings.get(MODULE_ID, "show-token-tool")) {
    let tokenControls = controls.find((x) => x.name === "token");
    tokenControls.tools.push({
      icon: "fa-solid fa-key",
      name: MODULE_ID,
      title: game.i18n.localize("update-your-password.tool.title"),
      button: true,
      onClick: updatePasswordDialog,
    });
  }
});

Hooks.on("getUserContextOptions", function (html, contextOptions) {
  contextOptions.push({
    name: game.i18n.localize("update-your-password.tool.title"),
    icon: '<i class="fa-solid fa-key"></i>',
    callback: updatePasswordDialog,
    condition: (li) => li[0].dataset.userId === game.userId && game.settings.get(MODULE_ID, "show-user-context-menu"),
  });
});

Hooks.on("ready", function () {
  if (game.settings.get(MODULE_ID, "expose-dialog-function")) {
    game.updateYourPassword = Object.freeze({
      showDialog: updatePasswordDialog,
    });
  }
});
