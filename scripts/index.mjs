'use strict';

function updatePasswordDialog() {
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
						ui.notifications.error('update-your-password.notifications.error.confirm-not-match', { localize: true });
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

Hooks.on('init', function () {
	game.settings.register('update-your-password', 'show-token-tool', {
		name: 'update-your-password.settings.show-token-tool.name',
		hint: 'update-your-password.settings.show-token-tool.hint',
		scope: 'world',
		config: true,
		type: Boolean,
		default: false,
		requiresReload: true
	});
	game.settings.register('update-your-password', 'show-user-context-menu', {
		name: 'update-your-password.settings.show-user-context-menu.name',
		hint: 'update-your-password.settings.show-user-context-menu.hint',
		scope: 'world',
		config: true,
		type: Boolean,
		default: true,
		requiresReload: true
	});
});

Hooks.on('getSceneControlButtons', function (controls) {
	if (game.settings.get('update-your-password', 'show-token-tool')) {
		let tokenControls = controls.find(x => x.name === 'token');
		tokenControls.tools.push({
			icon: 'fas fa-key',
			name: 'update-your-password',
			title: game.i18n.localize('update-your-password.tool.title'),
			button: true,
			onClick: updatePasswordDialog
		});
	}
});

Hooks.on('getUserContextOptions', function (html, contextOptions) {
	contextOptions.push({
		name: game.i18n.localize('update-your-password.tool.title'),
		icon: '<i class="fas fa-key"></i>',
		callback: updatePasswordDialog,
		condition: html => html.attr('data-user-id') === game.userId && game.settings.get('update-your-password', 'show-user-context-menu')
	});
});
