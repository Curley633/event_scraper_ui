# sudo apt install -y rsync

# rsync -ru ~/project/* minecraftuser@minecraft.keane.live:/home/minecraftuser/mcmonitor/
# ssh root@minecraft.keane.live "service mcmonitor stop && \
# cd /home/minecraftuser/mcmonitor && \
# npm install && service mcmonitor start"

# sudo apt install -y rsync

ERRORSTRING="Error. Please make sure you've indicated correct parameters"

if [[ "$#" -eq 0 ]]
    then
        echo $ERRORSTRING;
elif [ "$1" == "live" ]
    then
        if [[ -z $2 ]]
            then
                echo "Running dry-run"
                rsync --dry-run -az --force --delete --progress -e "ssh -p22" /C/Users/James/repos/event_scraper_ui/* ubuntu@ec2-54-77-155-24.eu-west-1.compute.amazonaws.com:/home/ubuntu/usr/src/event_scraper_ui

        elif [[ "$2" == "go" ]]
            then
                echo "Running actual deploy"
                rsync -az --force --delete --progress "ssh -i /C/vrworld-scoreboard-key.pem" /C/Users/James/repos/event_scraper_ui/* ubuntu@ec2-54-77-155-24.eu-west-1.compute.amazonaws.com:/home/ubuntu/usr/src/event_scraper_ui/
        else
            echo $ERRORSTRING;
        fi
fi

# time docker-compose -f docker-compose-prod.yml up -d || exit 1

# docker system prune --force -a