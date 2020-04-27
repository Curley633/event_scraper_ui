###################################################################
##  This script orchestrates the deployment to the staging VM    ##
##  It syncs the updated files from the master branch to the     ##
##  server. Then builds the docker production images and spins   ##
##  up the containers. "prune" removes any prev images and       ##
##  dangling docker data. "volume prune" removes any old volumes.##
###################################################################

ERRORSTRING="Error. Please make sure you've indicated correct parameters"

if [[ "$#" -eq 0 ]]
    then
        echo $ERRORSTRING;
elif [ "$1" == "live" ]
    then
        if [[ -z $2 ]]
            then
                echo "Running dry-run"
                rsync --dry-run -az --update --delete --progress -zz --exclude-from=rsync_exclude.txt -e "ssh -p22" \
                ~/repos/event_scraper_ui/* \
                ubuntu@ec2-54-77-155-24.eu-west-1.compute.amazonaws.com:/home/ubuntu/usr/src/event_scraper_ui/ && echo "Dry Run Complete" || exit 1

                echo " (Dry Run) Deploy to Staging VM Complete"


        elif [[ "$2" == "go" ]]
            then
                echo "Syncing Files"
                rsync -az --update --delete --progress -zz --exclude-from=rsync_exclude.txt -e "ssh -p22" \
                ~/project/* \
                ubuntu@ec2-54-77-155-24.eu-west-1.compute.amazonaws.com:/home/ubuntu/usr/src/event_scraper_ui/ && echo "Sync Complete" || exit 1

                ssh ubuntu@ec2-54-77-155-24.eu-west-1.compute.amazonaws.com "cd usr/src/event_scraper_ui && time docker-compose -f docker-compose-prod.yml up -d --build && docker system prune --force -a && docker volume prune --force && echo 'Docker-Compose-Prod Complete'" || exit 1

                echo "Deploy to Staging VM Complete"

        else
            echo $ERRORSTRING;
        fi
fi


