# Update Your Password

This module simply adds a new tool to the user list right click menu which allows players to update their passwords while logged in.

<video src="resources/readme-users-list.mp4" controls></video>

Clicking it will show this very simple dialog.

![Update password dialog](resources/readme-dialog.png)

Settings are available to toggle the visibility of both choices.

![Settings menu](resources/readme-settings.png)

A setting has been added to expose the primary `updatePasswordDialog()` function to macros and scripts. It is false by default but can be enabled by the game master. It will be exposed on the primary game object at `game.updateYourPassword.showDialog()` and work exactly the same way as the user invoked version.

A password must be typed in twice to confirm before applying. If the two entered passwords do not match, an error will be shown and the password will not be changed.

- It will also prevent you from setting a blank password in this manner as the tabletop does not seem to react to updating the password to nothing.
    - If you want to remove a password, it must be done through the standard game master interface.
