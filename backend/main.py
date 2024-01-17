import hug
from db import DAO

db_config = {
    'host':'db',
    'port':'3306',
    'database':'machina_labs',
    'user':'root',
    'password':'mysecretpassword'
}

dao = DAO(db_config)

"""    
    files can are referenced in process_run_file_artifact and in part_revision
    be able to download file from file.location

    2 things are in the files database: everything needs to be able to be downloaded
        1. file_artifact_uuid (preview these)
        2. geometry_file_uuid (do not preview these)
"""

@hug.get("/get_files_by_customer")
def get_files_by_customer():
    """
        get files by customer (display: customer.name)
    """
    query = " \
    SELECT name, location, file_type FROM ( \
        SELECT customer.name, file.location, 'geometry' as file_type FROM \
            customer JOIN part \
                on customer.uuid = part.customer_uuid \
            JOIN part_revision \
                on part.uuid = part_revision.part_uuid \
            JOIN file \
                on part_revision.geometry_file_uuid = file.uuid \
        UNION  \
        SELECT customer.name, file.location, 'artifact' as file_type FROM \
            customer JOIN part \
                ON customer.uuid = part.customer_uuid \
            JOIN part_revision \
                ON part.uuid = part_revision.part_uuid \
            JOIN trial \
                ON part_revision.uuid = trial.part_revision_uuid \
            JOIN process_run \
                ON trial.uuid = process_run.trial_uuid \
            JOIN process_run_file_artifact \
                ON process_run.uuid = process_run_file_artifact.process_run_uuid \
            JOIN file \
                ON process_run_file_artifact.file_artifact_uuid = file.uuid \
    ) n;"
    data = dao.select(query)
    ret: dict[str, list[tuple[str, str]]] = {}
    for name, fpath, ftype in data:
        if name in ret:
            ret[name].append((fpath, ftype))
        else:
            ret[name] = [(fpath, ftype)]
    return {'data': ret}

@hug.get("/get_files_by_part")
def get_files_by_part():
    """
     show files by part (display: part.name)
    """
    query = " \
    SELECT name, location, file_type FROM ( \
        SELECT part.name, file.location, 'geometry' as file_type FROM \
            part JOIN part_revision \
                on part.uuid = part_revision.part_uuid \
            JOIN file \
                on part_revision.geometry_file_uuid = file.uuid \
        UNION \
        SELECT part.name, file.location, 'artifact' as file_type FROM \
            part JOIN part_revision \
                ON part.uuid = part_revision.part_uuid \
            JOIN trial \
                ON part_revision.uuid = trial.part_revision_uuid \
            JOIN process_run \
                ON trial.uuid = process_run.trial_uuid \
            JOIN process_run_file_artifact \
                ON process_run.uuid = process_run_file_artifact.process_run_uuid \
            JOIN file \
                ON process_run_file_artifact.file_artifact_uuid = file.uuid \
    ) n;"
    data = dao.select(query)
    ret: dict[str, list[tuple[str, str]]] = {}
    for name, fpath, ftype in data:
        if name in ret:
            ret[name].append((fpath, ftype))
        else:
            ret[name] = [(fpath, ftype)]

    return {'data': ret}

@hug.get("/get_files_by_revision")
def get_files_by_revision():
    """
        show files by part_revision (display: part_revision.name)
    """
    query = " \
    SELECT name, location, file_type FROM (\
        SELECT part_revision.name, file.location, 'geometry' as file_type FROM \
            part_revision JOIN file\
                ON part_revision.geometry_file_uuid = file.uuid \
        UNION \
        SELECT part_revision.name, file.location, 'artifact' as file_type FROM \
            part_revision JOIN trial \
                ON part_revision.uuid = trial.part_revision_uuid \
            JOIN process_run \
                ON trial.uuid = process_run.trial_uuid \
            JOIN process_run_file_artifact \
                ON process_run.uuid = process_run_file_artifact.process_run_uuid \
            JOIN file \
                ON process_run_file_artifact.file_artifact_uuid = file.uuid \
    ) f;"
    data = dao.select(query)
    ret: dict[str, list[tuple[str, str]]] = {}
    for name, fpath, ftype in data:
        if name in ret:
            ret[name].append((fpath, ftype))
        else:
            ret[name] = [(fpath, ftype)]
    return {'data': ret}

@hug.get("/get_files_by_trial")
def get_files_by_trial():
    """
    only shows the file_artifacts
    show files by trial (display: trial.success) can be 0, 1, or NULL
        
        trial on process_run.trial_uuid = trial
        trial join process_run on trial.part_revision_uuid = part_revision.uuid
        
        0 is false
        1 is true
        null is a possible value
    """
    query = """ \
        SELECT trial.success, process_run.type, file.location, 'artifact' as file_type FROM \
            trial JOIN part_revision\
                ON part_revision.uuid = trial.part_revision_uuid \
            JOIN process_run \
                ON trial.uuid = process_run.trial_uuid \
            JOIN process_run_file_artifact \
                ON process_run.uuid = process_run_file_artifact.process_run_uuid \
            JOIN file \
                ON process_run_file_artifact.file_artifact_uuid = file.uuid;
    """
    data = dao.select(query)
    ret: dict[str, list[tuple[str, str]]] = {}
    for trial_res, run_type, fpath, ftype in data:
        if trial_res in ret:
            ret[trial_res].append((run_type, fpath, ftype))
        else:
            ret[trial_res] = [(run_type, fpath, ftype)]
    return {'data': ret}