
sudo apt install -y rsync

ERRORSTRING="Error. Please make sure you've indicated correct parameters"

if [[ "$#" -eq 0 ]]
    then
        echo $ERRORSTRING;
elif [ "$1" == "live" ]
    then
        if [[ -z $2 ]]
            then
                echo "Running dry-run"
                rsync --dry-run -az --force --delete --progress --exclude-from=rsync_exclude.txt -e \
                "ssh -i /C/vrworld-scoreboard-key.pem" \
                ~/project/* \
                ubuntu@ec2-54-77-155-24.eu-west-1.compute.amazonaws.com:/home/ubuntu/usr/src/event_scraper_ui && echo "Dry Run Complete"

        elif [[ "$2" == "go" ]]
            then
                echo "Syncing Files"
                rsync -az --force --delete --progress --exclude-from-rsync_exclude.txt -e \
                #"ssh -i /C/vrworld-scoreboard-key.pem" \
                ~/project/* \
                ubuntu@ec2-54-77-155-24.eu-west-1.compute.amazonaws.com:/home/ubuntu/usr/src/event_scraper_ui/ echo "Sync Complete"
        else
            echo $ERRORSTRING;
        fi
fi

time docker-compose -f docker-compose-prod.yml up -d || exit 1

docker system prune --force -a

#sudo service jenkins restart
