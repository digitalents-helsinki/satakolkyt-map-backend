CRON_EMAIL_PASS=$(grep CRON_EMAIL_PASS .env | xargs)
IFS='=' read -ra CRON_EMAIL_PASS <<< "$CRON_EMAIL_PASS"
CRON_EMAIL_PASS=${CRON_EMAIL_PASS[1]}

(crontab -l ; echo "0 7 * * * curl localhost:8089/api/map/cleanupemail/$CRON_EMAIL_PASS") | sort - | uniq - | crontab -
