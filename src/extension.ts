/*************************************************************************************************************************************/
/*                                                                                                                                   */
/*                                   Here is the main file containing the extension entry and exit                                   */
/*                                                                                                                                   */
/*************************************************************************************************************************************/




/*********************************************************External module*************************************************************/
import * as vscode from 'vscode';
import { FileSystem as filesystem } from './filesystem';





/**********************************************************Extension entry************************************************************/
export function activate(context: vscode.ExtensionContext) {
    console.log(filesystem.workspace_folder);
    console.log(filesystem.game_floder);
    console.log(filesystem.gamecontent_json_path);

}


/**********************************************************Extension exit*************************************************************/
export function deactivate() {

}
