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
class MessageVscToExtension{//vsc端向插件端发送的消息的格式
	type:string;
	subtype:string;
	contents?:any;
	constructor(type:string, subtype:string, contents?:any){
		this.type=type;
		this.subtype=subtype;
		this.contents=contents;
	}
}

export class SidebarProvider implements vscode.WebviewViewProvider {
	constructor(protected context: vscode.ExtensionContext) {}
  
	public resolveWebviewView(webviewView: vscode.WebviewView) {
	  webviewView.webview.options = {
		enableScripts: true,
		localResourceRoots: [this.context.extensionUri],
	  };
  
	  webviewView.webview.html = filesystem.getWebViewContent(this.context,"./src/webview/sidebar.html");//选择显示的html文件

	  webviewView.webview.onDidReceiveMessage(async message=>{//插件端接受webview端消息并处理
		switch(message.type){
			case 'initialize':
				if(typeof filesystem.workspace_folder === 'string'){//用户打开了工作区
					if(typeof filesystem.game_folder === 'string'){//存在game文件夹
						if(Array.isArray(filesystem.gamecontent_json_path)){//存在游戏内容json文件
							let jsonlist:string[] = filesystem.getGameContentJsonList();//获取json文件列表
							webviewView.webview.postMessage(new MessageVscToExtension('initialize','success',jsonlist));
						} else {//不存在游戏内容json文件
							webviewView.webview.postMessage(new MessageVscToExtension('initialize','no_jsonfile'));
						}
					} else {//不存在game文件夹
						webviewView.webview.postMessage(new MessageVscToExtension('initialize','no_gamefolder'));
					}
				} else {//用户没有打开工作区
					webviewView.webview.postMessage(new MessageVscToExtension('initialize','no_workplace'));
				}
				break;

			case 'get':
				switch(message.subtype){
					case 'json_list':
						let jsonlist=filesystem.getGameContentJsonList();
						webviewView.webview.postMessage(new MessageVscToExtension('give','json_list',jsonlist));
						break;

					case 'chapter_list':
						let chapterlist=await filesystem.getChapterList(message.contents[0]);
						webviewView.webview.postMessage(new MessageVscToExtension('give','chapter_list',chapterlist));
						filesystem.current_selected_json=message.contents[0];
						break;

					case 'section_list':
						break;

					case 'sentence_content':
						break;
				}
				break;

			case 'create':
				switch(message.subtype){
					case 'new_json':
						break;
				}
				break;

			case 'delete':
				break;

			case 'change':
				break;

		}

	  });

	}

  }