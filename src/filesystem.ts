/*************************************************************************************************************************************/
/*                                                                                                                                   */
/*                                           Here is the FileSystem of the extension                                                 */
/*                                                                                                                                   */
/*************************************************************************************************************************************/



/*********************************************************About modules***************************************************************/
export { FileSystem };

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as jsonstream from 'jsonstream';


class FileSystem {

    /*************************************************Static member attribute*********************************************************/

    static workspace_folder:string | undefined;//工作区文件夹路径
    static game_floder:string | boolean;//game文件夹路径
    static gamecontent_json_path:string[] | boolean;//记录游戏内容json文件的路径
    static gamecontent_json_exit: boolean = false;//记录工作区game文件下是否存在游戏内容json文件


    /***********************************************Static initialization method******************************************************/

    static initialize() {//初始化获取用户工作区文件相关信息
        this.workspace_folder = this.getWorkspaceFloder();
        this.game_floder = this.detectGameFloder();
        this.gamecontent_json_path = this.detectGameContentJson();
    }

    /**************************************************Static member function*********************************************************/

    static readUserFilesStructrue(): void {//读取用户文件并存于一定的文件存储结构中,包括renpy script文件，资源文件等

    }

    static async getChapterList(json_path: string[]): Promise<string[]> {
        const chapterNames: string[] = [];
      
        return new Promise((resolve, reject) => {
          const readStream = fs.createReadStream(json_path[0]);
          const jsonStream = jsonstream.parse('chapter.*.chaptername');
      
          readStream.pipe(jsonStream);
      
          jsonStream.on('data', (chaptername: string) => {
            chapterNames.push(chaptername);
          });
      
          jsonStream.on('end', () => {
            console.log('File reading and parsing completed.');
            resolve(chapterNames); // 解析完成后返回结果
          });
      
          jsonStream.on('error', (err) => {
            console.error('Error reading or parsing file:', err);
            reject(err); // 处理错误
          });
        });
      }

    static readGameContentSentence(): void {//读取选定sentence的内容，参数：选定的sentence

    }

    static createGameContentJson(): void {//在game文件夹下创建记录游戏内容的json文件
        if(typeof this.game_floder === 'string'){
            let filePath = path.join(this.game_floder,'gamecontent.vrd.json');
            try {
                fs.writeFileSync(filePath, '{}');
                console.log('File created successfully');
            } catch (err) {
                console.error('Error creating file:', err);
            }
        }
    }

    

    private static detectGameFloder(): boolean | string {//检测工作区是否存在game文件夹，存在返回路径，不存在返回false
        if (typeof this.workspace_folder === 'string') {
            try {
                const files = fs.readdirSync(this.workspace_folder);
                for (let file of files) {
                    if (file === 'game') {
                        return path.join(this.workspace_folder, file);
                    }
                }
            } catch (err) {
                throw err;
            }
        }
        return false;
    }

    private static getWorkspaceFloder() {//获取用户工作区文件夹路径，没有打开工作区则设置一个标志变量为0（暂时没写设置）
        let temp_workspace = vscode.workspace.workspaceFolders;
        if (temp_workspace && temp_workspace.length > 0) {
            const workspaceFolder = temp_workspace[0].uri.fsPath;
            return workspaceFolder;
        } else {
            vscode.window.showInformationMessage('No workspace folder open');
            return undefined;
        }
    }

    private static detectGameContentJson(): boolean | string[] {//检查用户工作区是否存在游戏内容json文件，存在则返回路径（可以是一个路径，也可以是多个路径返回数组），不存在则返回false
        if (typeof this.game_floder === 'string') {
            try {
                const files = fs.readdirSync(this.game_floder);
                const fileRegex = /\.vrd\.json$/;//游戏内容json文件正则表达式
                let gamejcontent_json = files.filter(file => fileRegex.test(file));
                if (gamejcontent_json.length > 0) {
                    this.gamecontent_json_exit = true;
                    return gamejcontent_json.map(file => path.join(this.game_floder as string, file));
                }
            } catch (err) {
                throw err;
            }
        }
        return false;
    }

    /**
     * 从某个HTML文件读取能被Webview加载的HTML内容
     * @param {*} context 上下文
     * @param {*} templatePath 相对于插件根目录的html文件相对路径
     */
    static getWebViewContent(context:vscode.ExtensionContext, templatePath:string) {
        const resourcePath = path.join(context.extensionPath, templatePath);
        const dirPath = path.dirname(resourcePath);
        let html = fs.readFileSync(resourcePath, 'utf-8');
        // vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
        html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
            return $1 + vscode.Uri.file(path.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
        });
        return html;
    }


    static isStringArray(value: any): value is string[] {//判断一个变量是不是字符串数组
        return Array.isArray(value) && value.every(item => typeof item === 'string');
      }

    /**************************************************Static member object***********************************************************/
    
    GameContentChapter: object = {

    };
}