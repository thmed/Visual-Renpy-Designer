/*************************************************************************************************************************************/
/*                                                                                                                                   */
/*                                   Here is the main file containing the extension entry and exit                                   */
/*                                                                                                                                   */
/*************************************************************************************************************************************/


//使用ctrl+F搜索“暂定”或“修改”来查看哪些地方需要修改


/*********************************************************About modules***************************************************************/
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { FileSystem as filesystem } from './filesystem';
import {SidebarProvider} from './webview_communication';


/**********************************************************Extension entry************************************************************/



export function activate(context: vscode.ExtensionContext) {

    filesystem.initialize();

	context.subscriptions.push(vscode.window.registerWebviewViewProvider('designer-manager',new SidebarProvider(context)));//创建sidebarwebview


    
}


/**********************************************************Extension exit*************************************************************/

export function deactivate() {

}
