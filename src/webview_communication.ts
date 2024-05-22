/*************************************************************************************************************************************/
/*                                                                                                                                   */
/*                                    Here is about creating webviews and communication                                              */
/*                                                                                                                                   */
/*************************************************************************************************************************************/



/*********************************************************About modules***************************************************************/
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { FileSystem as filesystem } from './filesystem';


/***********************************************performance manager sidebar webview***************************************************/

export class SidebarProvider implements vscode.WebviewViewProvider {
	constructor(protected context: vscode.ExtensionContext) {}
  
	public resolveWebviewView(webviewView: vscode.WebviewView) {
	  webviewView.webview.options = {
		enableScripts: true,
		localResourceRoots: [this.context.extensionUri],
	  };
  
	  webviewView.webview.html = filesystem.getWebViewContent(this.context,"./src/webview/sidebar.html");

	  webviewView.webview.onDidReceiveMessage(message=>{
		if(message.type==='buttonClick'){//按下按钮
			
		}
	  });

	}

  }