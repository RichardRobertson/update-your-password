'use strict';

Hooks.on('getSceneControlButtons', function (controls) {
	let tokenControls = controls.find(x => x.name === 'token');
	tokenControls.tools.push({
		icon: 'fas fa-key',
		name: 'update-your-password',
		title: game.i18n.localize('update-your-password.tool.title'),
		button: true,
		onClick: () => {
			new Dialog({
				title: game.i18n.localize('update-your-password.dialog.title'),
				content: `<label for="new-password">${game.i18n.localize('update-your-password.dialog.label.contents')}</label><input id="new-password" type="password"><label for="confirm-new-password">${game.i18n.localize('update-your-password.dialog.confirm-label.contents')}</label><input id="confirm-new-password" type="password">`,
				buttons: {
					apply: {
						icon: '<i class="fas fa-check"></i>',
						label: game.i18n.localize('update-your-password.dialog.buttons.apply.label'),
						callback: async (html) => {
							const newPassword = html.find('#new-password')[0].value;
							const confirmPassword = html.find('#new-password')[0].value;
							if (newPassword !== confirmPassword) {
								ui.notifications.error('update-your-password.notifications.error.confirm-not-match', { localize: true});
								return;
							}
							if (newPassword.length !== 0) {
								await game.user.update({ password: newPassword });
							}
						}
					},
					cancel: {
						icon: '<i class="fas fa-times"></i>',
						label: game.i18n.localize('update-your-password.dialog.buttons.cancel.label')
					}
				},
				default: 'apply'
			}).render(true);
		}
	});
});
