#!/bin/bash

# ReConfi Smile Website Backup Script
# 創建日期: $(date)

echo "開始備份 ReConfi Smile 網站..."

# 設置備份目錄
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="reconfi-smile-backup_$TIMESTAMP"

# 創建備份目錄
mkdir -p "$BACKUP_DIR"

echo "創建備份: $BACKUP_NAME"

# 創建備份檔案
tar -czf "$BACKUP_DIR/$BACKUP_NAME.tar.gz" \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.git' \
  --exclude='backups' \
  --exclude='*.log' \
  --exclude='.env.local' \
  --exclude='.env.production' \
  --exclude='.env.development' \
  .

# 檢查備份是否成功
if [ $? -eq 0 ]; then
    echo "✅ 備份成功完成!"
    echo "📁 備份位置: $BACKUP_DIR/$BACKUP_NAME.tar.gz"
    echo "📊 備份大小: $(du -h "$BACKUP_DIR/$BACKUP_NAME.tar.gz" | cut -f1)"
    
    # 顯示最近的備份
    echo ""
    echo "📋 最近的備份檔案:"
    ls -la "$BACKUP_DIR"/*.tar.gz | tail -5
else
    echo "❌ 備份失敗!"
    exit 1
fi

echo ""
echo "備份完成時間: $(date)" 