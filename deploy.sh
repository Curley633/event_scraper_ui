####################################################################
##  This script orchestrates code deployment to the production VM ##
##  It syncs the updated files from the master branch to the      ##
##  server. Then builds the docker production images and spins    ##
##  up the containers. "prune" removes any prev images and        ##
##  dangling docker data. "volume prune" removes any old volumes. ##
##  Jenkins is then restarted.                                    ##
####################################################################

ERRORSTRING="Error. Please make sure you've indicated correct parameters"

if [[ "$#" -eq 0 ]]
    then
        echo $ERRORSTRING;
elif [ "$1" == "live" ]
    then
        if [[ -z $2 ]]
            then
                echo "Running Production dry-run"
                rsync --dry-run -az --update --delete --progress -zz --exclude-from=rsync_exclude.txt -e "ssh -p22" \
                ~/repos/event_scraper_ui/* \
                james@206.189.165.104:/home/james/var/www/event_scraper_ui/ && echo "Prod Dry Run Complete" || exit 1

        elif [[ "$2" == "go" ]]
            then
                echo "Syncing Production Files"
                rsync -az --update --delete --progress -zz --exclude-from=rsync_exclude.txt -e "ssh -p22" \
                ~/project/* \
                james@206.189.165.104:/home/james/var/www/event_scraper_ui/ && echo "Prod Sync Complete" || exit 1

                ssh james@206.189.165.104 "cd var/www/event_scraper_ui && time docker-compose -f docker-compose-prod.yml up -d --build && docker system prune --force -a && docker volume prune --force && sudo service jenkins restart && echo 'Docker-Compose-Prod Complete'" || exit 1

        else
            echo $ERRORSTRING;
        fi
fi


