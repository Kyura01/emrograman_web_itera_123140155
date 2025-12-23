from pyramid.view import view_config
from pyramid.response import Response
from ..models import Matakuliah
from sqlalchemy.exc import IntegrityError
import json

@view_config(route_name='matakuliah_list', renderer='json', request_method='GET')
def get_all_matakuliah(request):
    query = request.dbsession.query(Matakuliah).all()
    return {'matakuliahs': [mk.to_dict() for mk in query]}

@view_config(route_name='matakuliah_list', renderer='json', request_method='POST')
def create_matakuliah(request):
    try:
        data = request.json_body
        new_mk = Matakuliah(
            kode_mk=data['kode_mk'],
            nama_mk=data['nama_mk'],
            sks=data['sks'],
            semester=data['semester']
        )
        request.dbsession.add(new_mk)
        request.dbsession.flush()  # Force database operation
        return {'status': 'success', 'data': new_mk.to_dict()}
    except IntegrityError as e:
        request.dbsession.rollback()
        if 'uq_matakuliah_kode_mk' in str(e.orig) or 'duplicate key' in str(e.orig):
            return Response(
                json={'error': 'Kode matakuliah sudah ada', 'kode_mk': data['kode_mk']},
                status=409
            )
        return Response(json={'error': 'Database integrity error'}, status=400)

@view_config(route_name='matakuliah_detail', renderer='json', request_method='GET')
def get_one_matakuliah(request):
    mk_id = request.matchdict['id']
    mk = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if not mk:
        return Response(json={'error': 'Not Found'}, status=404)
    return mk.to_dict()

@view_config(route_name='matakuliah_detail', renderer='json', request_method='PUT')
def update_matakuliah(request):
    mk_id = request.matchdict['id']
    data = request.json_body
    mk = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if mk:
        try:
            mk.kode_mk = data.get('kode_mk', mk.kode_mk)
            mk.nama_mk = data.get('nama_mk', mk.nama_mk)
            mk.sks = data.get('sks', mk.sks)
            mk.semester = data.get('semester', mk.semester)
            request.dbsession.flush()  # Force database operation
            return {'status': 'updated', 'data': mk.to_dict()}
        except IntegrityError as e:
            request.dbsession.rollback()
            if 'uq_matakuliah_kode_mk' in str(e.orig) or 'duplicate key' in str(e.orig):
                return Response(
                    json={'error': 'Kode matakuliah sudah ada', 'kode_mk': data.get('kode_mk')},
                    status=409
                )
            return Response(json={'error': 'Database integrity error'}, status=400)
    return Response(json={'error': 'Not Found'}, status=404)

@view_config(route_name='matakuliah_detail', renderer='json', request_method='DELETE')
def delete_matakuliah(request):
    mk_id = request.matchdict['id']
    mk = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if mk:
        request.dbsession.delete(mk)
        return {'status': 'deleted'}
    return Response(json={'error': 'Not Found'}, status=404)