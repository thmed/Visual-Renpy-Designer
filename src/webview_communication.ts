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

	  webviewView.webview.onDidReceiveMessage(async message=>{
		switch(message.type){//webview申请初始化显示
		case 'initialize':
			if(typeof filesystem.workspace_folder === 'string'){//用户打开了工作区
				if(typeof filesystem.game_floder === 'string'){//存在game文件夹
					if(filesystem.isStringArray(filesystem.gamecontent_json_path)){//存在游戏内容json文件
						let chaptername:string[] = await filesystem.getChapterList(filesystem.gamecontent_json_path);
						webviewView.webview.postMessage({chapterlist:chaptername});
					}
				}
			}
			else{

			}

			break;

		case 'getcontent':
			break;
		}


	  });

	}

  }