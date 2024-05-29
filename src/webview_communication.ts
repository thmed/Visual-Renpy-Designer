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
		switch(message.type){
		case 'get_initialize'://webview申请初始化显示
			if(typeof filesystem.workspace_folder === 'string'){//用户打开了工作区
				if(typeof filesystem.game_floder === 'string'){//存在game文件夹
					if(filesystem.isStringArray(filesystem.gamecontent_json_path)){//存在游戏内容json文件
						//发送json文件中的chapter列表（暂定，待修改）
						let chaptername:string[] = await filesystem.getChapterList(filesystem.gamecontent_json_path);//获取章列表
						webviewView.webview.postMessage({type:'give_initialize',status:'yes',content:chaptername});
					} else {//不存在游戏内容json文件
						webviewView.webview.postMessage({type:'give_initialize',status:'no_jsonfile',content:''});
					}
				} else {//不存在game文件夹
					webviewView.webview.postMessage({type:'give_initialize',status:'no_gamefloder',content:''});
				}
			} else {//用户没有打开工作区
				webviewView.webview.postMessage({type:'give_initialize',status:'no_workplace',content:''});
			}
			break;

		case 'get_json_list'://webview请求json文件列表
		break;

		case 'get_chapter_list'://webview请求章列表
		break;
		
		case 'get_section_list'://webview请求节列表
			console.log('请求该章下的节列表：',message.content);//待修改
		break;

		case 'get_sentence_content'://webview请求句子内容
		break;

		}


	  });

	}

  }