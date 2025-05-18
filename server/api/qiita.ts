// filepath: /workspaces/barashimaPF/server/api/qiita.ts
import { defineEventHandler, getQuery } from 'h3';
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';

export default defineEventHandler(async (event) => {
  const username = 'shimauma0322';
  const query = getQuery(event);
  const action = query.action;
  
  // publicディレクトリへのパス
  const publicPath = process.cwd() + '/public';
  const filePath = `${publicPath}/qiita-articles.json`;

  try {
    // 記事の更新処理
    if (action === 'update') {
      // 公開APIを使用して認証なしでデータを取得（トークン不要）
      const response = await fetch(`https://qiita.com/api/v2/users/${username}/items?page=1&per_page=20`);

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const articles = await response.json();
      
      // 必要なデータだけを抽出
      const processedArticles = articles.map((article) => ({
        id: article.id,
        title: article.title,
        url: article.url,
        likes_count: article.likes_count,
        created_at: article.created_at,
        updated_at: article.updated_at,
        tags: article.tags.map((tag) => tag.name)
      }));

      // 公開ディレクトリにJSONとして保存
      try {
        // フォルダが存在することを確認
        await mkdir(publicPath, { recursive: true });
        await writeFile(filePath, JSON.stringify(processedArticles, null, 2));
        
        return { 
          success: true, 
          message: 'Qiita articles updated successfully', 
          count: processedArticles.length,
          data: processedArticles
        };
      } catch (writeError) {
        console.error('Failed to write Qiita articles to file:', writeError);
        return processedArticles; // 書き込みに失敗した場合でもデータを返却
      }
    } 
    
    // JSONファイルからデータを読み込む（デフォルト動作）
    try {
      const fileExists = await access(filePath).then(() => true).catch(() => false);
      
      if (fileExists) {
        const data = await readFile(filePath, 'utf-8');
        return JSON.parse(data);
      } else {
        // ファイルが存在しない場合はAPIから直接取得
        const response = await fetch(`https://qiita.com/api/v2/users/${username}/items?per_page=10`);
        if (!response.ok) throw new Error('Qiita API error');
        
        const articles = await response.json();
        
        // 必要なデータのみを抽出
        return articles.map((article) => ({
          id: article.id,
          title: article.title,
          url: article.url,
          likes_count: article.likes_count,
          created_at: article.created_at,
          updated_at: article.updated_at,
          tags: article.tags.map((tag) => tag.name)
        }));
      }
    } catch (readError) {
      console.error('Failed to read Qiita articles from file:', readError);
      // ファイル読み込みに失敗した場合は更新を促す
      return { 
        success: false, 
        message: 'No cached data available. Please run the update action first.'
      };
    }
  } catch (error) {
    console.error('Failed to fetch Qiita articles:', error);
    return { error: 'Failed to fetch Qiita articles', status: 500 };
  }
});
